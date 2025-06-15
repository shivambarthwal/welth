"use client"
import { updatedDefaultAccount } from '@/actions/accounts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import useFetch from '@/hooks/useFetch'
import { ArrowDownRight, ArrowRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { toast } from 'sonner'

const AccountCard = ({account}) => {

    const {name,balance,type,id,isDefault} = account;
    const { 
loading : updatedDefaultLoading,
fn: updatedDefaultFn,
data : updatedAccount,
error
    } = useFetch(updatedDefaultAccount)

    const handleDefaultChange = async () => {
        console.log("clickedDefault", isDefault);
        event.preventDefault();
        if(isDefault){
            toast.warning("Account is already default");
            return;
        }
        await updatedDefaultFn(id);
      };

      useEffect(()=>{
        if(updatedAccount?.success){
            toast.success("Account updated successfully");
        }
      },[updatedAccount,updatedDefaultLoading])

      useEffect(()=>{
        if(error){
            toast.error(error.message || "Failed to Updated The Default account");
        }
      },[error])
  return (
    <Card className='hover:shadow-md transition-shadow cursor-pointer group relative'>
    
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium capitalize'>{name}</CardTitle>
            <Switch 
             checked={isDefault} 
              onClick={handleDefaultChange}
              disabled={updatedDefaultLoading}
              className='cursor-pointer'
              />
          
        </CardHeader>
        <Link href={`/account/${id}`}>
        <CardContent>
<div className='text-2xl font-bold'>
    ${parseFloat(balance).toFixed(2)}
</div>
<p className='text-muted-foreground text-xs'>{type.charAt(0).toUpperCase() + type.slice(1)} ACCOUNT</p>

        </CardContent>
        </Link>
        <CardFooter className='flex justify-between text-sm text-muted-foreground'>
            <div className='flex items-center'>
                <ArrowUpRight className='mr-1 h-5 w-5 text-green-500'/>
                Income
            </div>
            <div className='flex items-center '>
                <ArrowDownRight className='mr-1 h-5 w-5 text-red-500'/>
                Expense
            </div>
        </CardFooter>
    </Card>
  )
}

export default AccountCard