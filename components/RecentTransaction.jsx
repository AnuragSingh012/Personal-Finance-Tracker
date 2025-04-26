import React from 'react';

const RecentTransaction = ({ transactions }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const top5Transactions = sortedTransactions.slice(0, 5);

  return (
    <div className="flex flex-col flex-1 bg-[#0d1424] px-12 py-4 rounded-2xl text-white" style={{ minHeight: '300px' }}>
      <h2 className="text-2xl font-medium mb-4">Recent Transactions</h2>

      {top5Transactions.length === 0 ? (
        <div className="flex justify-center items-center text-white font-semibold text-lg h-full">
          <p>No transaction history</p>
        </div>
      ) : (
        <div className="w-full space-y-3 overflow-y-auto max-h-[300px]">

          <div className="flex justify-between font-semibold text-lg mb-4">
            <div className="w-1/4">Date</div>
            <div className="w-1/4">Category</div>
            <div className="w-1/4">Payee</div>
            <div className="w-1/4 text-right">Amount</div>
          </div>
          
          {top5Transactions.map((transaction) => (
            <div
              key={transaction._id}
              className="flex justify-between items-center py-2 border-b border-gray-600"
            >
              <div className="w-1/4 text-sm">{formatDate(transaction.date)}</div>
              <div className="w-1/4 text-sm">{transaction.category}</div>
              <div className="w-1/4 text-sm">{transaction.payee}</div>
              <div className="w-1/4 text-sm text-right">
                <span
                  className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  {transaction.type === 'income'
                    ? `+₹${transaction.amount}`
                    : `-₹${Math.abs(transaction.amount)}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentTransaction;
