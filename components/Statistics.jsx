'use client';

import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import Link from 'next/link';

const COLORS = ['#00C49F', '#FF8042'];

const Statistics = ({ user }) => {
  const { income = 0, expenses = 0 } = user || {};

  const data = [
    { name: 'Income', value: income },
    { name: 'Expenses', value: expenses },
  ];

  return (
    <div className='flex flex-col flex-1 bg-[#0d1424] px-12 py-4 rounded-2xl text-white'>
      <div className='text-xl font-semibold mb-4'>Your Statistics</div>
      {income>0 && expenses>0 ? (
        <div className='flex justify-center items-center'>
              <PieChart width={350} height={350}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
        </div>
      ): (
        <div className='w-full h-full flex flex-col items-center justify-center text-center space-y-2'>
  <div className='text-red-400 font-semibold'>
    Looks a bit empty here!
  </div>
  <div className='text-gray-300'>
    Add some income or expenses to see your stats grow 📈
  </div>
  <div className='text-green-400'>
    Head over to the <span className="underline text-blue-600"><Link href="/transactions">Transactions</Link></span> page from the navbar.
  </div>
</div>

      )}
      
    </div>
  );
};

export default Statistics;
