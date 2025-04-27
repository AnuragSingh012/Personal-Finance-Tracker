import React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BudgetChart = ({ user }) => {
  if (!user || !user.transactions || !user.budget) return <div>Loading...</div>;

  const categoryTotals = {};
  const budgetCategories = user.budget[0]?.categories || [];
  budgetCategories.forEach((category) => {
    categoryTotals[category.name] = {
      Budget: category.amount,
      Spent: 0,
    };
  });

  user.transactions.forEach((transaction) => {
    const categoryName = transaction.category;
    if (!categoryTotals[categoryName]) {
      categoryTotals[categoryName] = {
        Budget: 0,
        Spent: 0,
      };
    }
    categoryTotals[categoryName].Spent += transaction.amount;
  });

  const chartData = Object.keys(categoryTotals).map((category) => ({
    name: category,
    Budget: categoryTotals[category].Budget,
    Spent: categoryTotals[category].Spent,
  }));

  return (
    <div className="bg-[#0d1424] mb-40 p-6 rounded-2xl w-full h-[500px] shadow-lg flex flex-col">
      <div className="text-white text-2xl font-bold mb-6 tracking-wide">Budget Statistics</div>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="name" stroke="#cbd5e1" />
            <YAxis stroke="#cbd5e1" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
              itemStyle={{ color: '#f1f5f9' }}
              cursor={{ fill: 'rgba(255,255,255,0.1)' }}
            />
            <Legend wrapperStyle={{ color: '#cbd5e1' }} />
            <Bar dataKey="Spent" fill="#ef4444" radius={[8, 8, 0, 0]} />
            <Bar dataKey="Budget" fill="#22c55e" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetChart;
