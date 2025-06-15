"use server"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

const serializedTransaction = (obj)=>{
    const serialized = {...obj};
    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
    if(obj.amount){
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
}

export async function updatedDefaultAccount(accountId){
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Unauthenticated");
        const userID = userId;

        const user = await db.user.findUnique({
            where : {
                clerkUserId : userID
            }
        })
        if(!user) throw new Error("User not found");

        await db.account.updateMany({
            where : {
                userId : user.id,
                isDefault : true
            },
            data : {
                isDefault : false
            }
        })
         const account =await db.account.update({
            where : {
                id : accountId,
                userId : user.id,

            },
            data : {
                isDefault : true
            }
        });

        revalidatePath("/dashboard");
        return {success : true , data : serializedTransaction(account)};
    } catch (error) {
        return {success : false , error : error.message};
        
    }
}

export async function getAccountWithTransactions(accountId){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthenticated");

    const user = await db.user.findUnique({
        where : {
            clerkUserId : userId
        }
    })
    if(!user) throw new Error("User not found");

    const account = await db.account.findUnique({
        where : {
            id : accountId,
            userId : user.id
        },
        include : {
            transactions : {
                orderBy : {
                    date : "desc"
                }
            },
            _count : {
                select : {
                    transactions : true
                }
            }
        }
    })
    if(!account) throw new Error("Account not found");
    return {
        ...serializedTransaction(account),
        transactions : account.transactions.map(serializedTransaction)
    }
}

export async function bulkDeleteTransactions(transactionIds){
    try {
        const {userId} = await auth();
        if(!userId) throw new Error("Unauthenticated");

        const user = await db.user.findUnique({
            where : {
                clerkUserId : userId
            }
        })
        if(!user) throw new Error("User not found");
        const transactions = await db.transaction.findMany({
            where : {
                id : {
                    in : transactionIds
                },
                userId : user.id
            }
        })

        const accountBalanceChanges = transactions.reduce((acc, transaction) => {
            const change = transaction.type === "EXPENSE" ? transaction.amount : -transaction.amount;
            acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
            return acc;
        },{});

        await db.$transaction(async (tx)=>{
            await tx.transaction.deleteMany({
                where : {
                    id : {
                        in : transactionIds
                    },
                    userId : user.id
                }
            });

            for(const [accountId, change] of Object.entries(accountBalanceChanges)){
                await tx.account.update({
                    where : {
                        id : accountId,
                        userId : user.id
                    },
                    data : {
                        balance : {
                            decrement : change
                        }
                    }
                })
            }
        })
        revalidatePath("/dashboard");
        revalidatePath("/account/[id]");
        return {success : true};
    } catch (error) {
        console.error("Error deleting transactions:", error);
        return {success : false, error : error.message};
        
    }
}