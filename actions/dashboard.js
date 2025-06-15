"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


const serializeTransaction = (obj) =>{
    const serialized = {...obj};

    if(obj.balance){
        serialized.balance = obj.balance.toNumber();
    }
    if(obj.amount){
        serialized.amount = obj.amount.toNumber();
    }
    return serialized;
}
export async function createAccount(data){
try{
const {userId} = await auth();
if(!userId) throw new Error("Unauthenticated");

const user = await db.user.findUnique({
    where : {
        clerkUserId : userId
    }
})
if(!user){
    throw new Error("User not found");
}

//convert balance in float

const balanceFloat = parseFloat(data.balance)
if(isNaN(balanceFloat)){
    throw new Error("Invalid balance");
}

const existingAccounts = await db.account.findMany({
    where : {
        userId : user.id
    }
})

const shouldBeDefault = existingAccounts.length === 0 ? true : data.isDefault;
if(shouldBeDefault){
    await db.account.updateMany({
        where : {
            userId : user.id,
            isDefault : true
        },
        data : {
            isDefault : false
        }
    })
}
const account = await db.account.create({
    data : {
        ...data,
        balance : balanceFloat,
        isDefault : shouldBeDefault,
        userId : user.id,
    }
})
 const serializedAccount = serializeTransaction(account);
revalidatePath("/dashboard");
return {sucess : true, data : serializedAccount};

}catch(error){
throw new Error(error.message);
}
}

export async function getUserAccounts(){
    const { userId } = await auth();
    if(!userId) throw new Error("Unauthenticated");
    
    const user = await db.user.findUnique({
        where:{
            clerkUserId : userId
        }
    })
    if(!user) throw new Error("User not found");

    const accounts = await db.account.findMany({
        where : {
            userId : user.id
        },
        orderBy : {
            isDefault : "desc"
        },
        include:{
            _count :{
                select : {
                    transactions : true
                }
            }
        }
    })
    const  serializedAccount = accounts.map(serializeTransaction);
    return serializedAccount;
 
}

export async function getDashboardData() {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");
  
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Get all user transactions
    const transactions = await db.transaction.findMany({
      where: { userId: user.id },
      orderBy: { date: "desc" },
    });
  
    return transactions.map(serializeTransaction);
  }