import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CategoryChart = ({ user }) => {
  const categories = ['Salary', 'Grocery', 'Rent', 'Entertainment', 'Investment', 'Other'];

  const categoryData = categories.reduce((acc, category) => {
    acc[category] = 0;
    return acc;
  }, {});

  user.transactions.forEach(transaction => {
    const category = transaction.category;
    if (categories.includes(category)) {
      if (transaction.type === 'income') {
        categoryData[category] += transaction.amount;
      } else if (transaction.type === 'expense') {
        categoryData[category] -= transaction.amount;
      }
    } else {
      categoryData['Other'] += transaction.amount;
    }
  });

  const data = categories.map(category => ({
    name: category,
    uv: categoryData[category],
    pv: categoryData[category],
  }));

  return (
    <div className="w-full mb-40 px-6 py-6 mt-8 bg-[#0d1424] rounded-2xl shadow-lg">
      <div className="text-white text-xl font-semibold mb-4">Category Statistics</div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <CartesianGrid strokeDasharray="3 3" stroke="#4f5d7a" />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryChart;
