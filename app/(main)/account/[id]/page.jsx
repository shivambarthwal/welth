import { getAccountWithTransactions } from '@/actions/accounts'
import NotFound from '@/app/not-found'

import React, { Suspense } from 'react'

import { BarLoader } from 'react-spinners'
import { notFound } from 'next/navigation'
import { TransactionTable } from '../_components/TransactionTable'
import { AccountChart } from '../_components/AccountChart'


const AccountPage = async ({params}) => {
  const resolvedParams = await params;
  const accountData = await getAccountWithTransactions(resolvedParams.id);
  if (!accountData) {
    notFound();
  }

  const { transactions , ...account} = accountData;

  return (
    <div className='space-y-8 px-5 '>
      <div className='flex gap-4 item-end justify-between'>
      <div>
        <h1 className='text-4xl md:text-6xl  font-extrabold tracking-tighter pr-2 pb-2 bg-gradient-to-br from-blue-600 to-purple-600 text-transparent bg-clip-text '>{account.name}</h1>
        <p className='text-muted-foreground'>{account.type.charAt(0) + account.type.slice(1).toLowerCase()} Account</p>
      </div>
      <div className='text-right pb-2'>
        <div className='text-xl sm:text-2xl font-bold'>${parseFloat(account.balance).toFixed(2)}</div>
        <p className='text-muted-foreground text-sm'>{account._count.transactions} transactions</p>
      </div>
      </div>
    {/* Chart Section */}

    <Suspense 
    fallback={<BarLoader className="mt-4" width={"100"} height={"100"} color="#9333ea"/>}
    >
<AccountChart transactions={transactions}/>
    </Suspense>
    {/* TransactionTable */}
    <Suspense 
    fallback={<BarLoader className="mt-4" width={"100"} height={"100"} color="#36d7b7"/>}
    >
      <TransactionTable transactions={transactions}/>
    </Suspense>
    </div>
  )
}

export default AccountPage