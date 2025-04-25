// financeData.js

export const financeData = {
    remainingBalance: 15000,
    income: [
      {
        source: "Salary",
        amount: 30000,
        date: "2025-04-01"
      },
      {
        source: "Freelance",
        amount: 8000,
        date: "2025-04-15"
      }
    ],
    expenses: [
      {
        category: "Groceries",
        amount: 5000,
        date: "2025-04-02"
      },
      {
        category: "Rent",
        amount: 12000,
        date: "2025-04-05"
      },
      {
        category: "Entertainment",
        amount: 1500,
        date: "2025-04-10"
      },
      {
        category: "Utilities",
        amount: 3000,
        date: "2025-04-12"
      }
    ],
    recentTransactions: [
      {
        type: "Income",
        description: "Salary",
        amount: 30000,
        date: "2025-04-01"
      },
      {
        type: "Expense",
        description: "Groceries",
        amount: -5000,
        date: "2025-04-02"
      },
      {
        type: "Expense",
        description: "Rent",
        amount: 12000,
        date: "2025-04-05"
      },
      {
        type: "Income",
        description: "Freelance",
        amount: 8000,
        date: "2025-04-15"
      },
      {
        type: "Expense",
        description: "Entertainment",
        amount: 1500,
        date: "2025-04-10"
      }
    ]
  };
  