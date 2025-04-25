import React from 'react'
import { financeData } from '@/constants'

const RecentTransaction = () => {
  return (
    <div className='flex flex-col flex-1 bg-[#0b100e] px-12 py-4 rounded-2xl text-white'>
      <h2 className='text-2xl font-medium mb-4'>Transactions</h2>
      <div className='w-full space-y-3'>
        {financeData.recentTransactions.map((transaction) => (
          <div key={transaction.id} className='flex justify-between p-3'>
            <span>{transaction.title}</span>
            <span>{transaction.amount > 0 ? `+₹${transaction.amount}` : `-₹${Math.abs(transaction.amount)}`}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentTransaction
