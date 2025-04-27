import React from 'react';

const getTodayDate = () => {
  const today = new Date();
  return today.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
};

const TransactionCard = ({ user }) => {
  const { income = 0, expenses = 0 } = user || {};
  const todayDate = getTodayDate();

  const balance = income - expenses;

  const getAmountColor = (amount) => {
    if (amount > 0) return 'text-green-500';
    if (amount < 0) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className='flex flex-wrap justify-evenly gap-6'>
      <div className='flex flex-1 flex-col px-6 py-6 bg-[#0d1424] text-white rounded-2xl'>
        <div className='flex items-center gap-4 justify-between'>
          <p className='text-2xl font-medium'>Balance</p>
          <span className="text-3xl">💰</span>
        </div>
        <p className='text-lg font-light'>{todayDate}</p>
        <p className={`text-3xl font-bold ${getAmountColor(balance)}`}>
          ₹ {balance}
        </p>
      </div>

      <div className='flex flex-1 flex-col px-6 py-6 bg-[#0d1424] text-white rounded-2xl'>
        <div className='flex items-center gap-4 justify-between'>
          <p className='text-2xl font-medium'>Income</p>
          <span className="text-3xl">📈</span>
        </div>
        <p className='text-lg font-light'>{todayDate}</p>
        <p className={`text-3xl font-bold ${getAmountColor(income)}`}>
          ₹ {income}
        </p>
      </div>

      <div className='flex flex-1 flex-col px-6 py-6 bg-[#0d1424] text-white rounded-2xl'>
        <div className='flex items-center gap-4 justify-between'>
          <p className='text-2xl font-medium'>Expenses</p>
          <span className="text-3xl">📉</span>
        </div>
        <p className='text-lg font-light'>{todayDate}</p>
        <p className={`text-3xl font-bold ${getAmountColor(expenses)}`}>
          ₹ {expenses}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
