"use client";

import React, { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const SetBudget = ({ refreshUser }) => {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  // Predefined categories
  const predefinedCategories = [
    "Salary",
    "Grocery",
    "Rent",
    "Entertainment",
    "Investment",
    "Other",
  ];

  const [currentMonth, setCurrentMonth] = useState("");
  const [userBudgets, setUserBudgets] = useState([]);

  // Set the current month
  useEffect(() => {
    const month = new Date().toLocaleString('default', { month: 'long' }); // Get the current month
    setCurrentMonth(month);
  }, []);

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not found. Please login.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory : category;

    if (!finalCategory || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    // Check if the budget for the category already exists
    const existingBudgetIndex = userBudgets.findIndex(
      (budget) => budget.category === finalCategory && budget.month === currentMonth
    );

    let updatedBudgets = [...userBudgets];

    if (existingBudgetIndex === -1) {
      // If the category is not found, add a new budget entry
      updatedBudgets.push({
        category: finalCategory,
        amount: parseFloat(amount),
        month: currentMonth,
      });
    } else {
      // If the category already exists for the month, update the budget
      updatedBudgets[existingBudgetIndex].amount = parseFloat(amount);
    }

    setLoading(true);

    try {
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, budgets: updatedBudgets }),
      });

      const data = await response.json();

      if (response.ok) {
        setCategory("");
        setCustomCategory("");
        setAmount("");
        setLoading(false);
        alert("Budget set successfully!");
      } else {
        alert(data.message || "Error setting budget.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div className="my-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-black text-white border-0 cursor-pointer" variant="outline">
            Set Monthly Budget
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-[#0d1424]">
          <AlertDialogHeader>
            <AlertDialogTitle>Set Monthly Budget</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the details of the monthly budget.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 px-4 py-6">
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm text-white">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
              >
                <option value="">Select category</option>
                {predefinedCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {category === "Other" && (
              <div className="flex flex-col">
                <label htmlFor="customCategory" className="text-sm text-white">Custom Category</label>
                <input
                  type="text"
                  id="customCategory"
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Enter custom category"
                  className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
                />
              </div>
            )}

            <div className="flex flex-col">
              <label htmlFor="amount" className="text-sm text-white">Amount</label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
              />
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel className="bg-white text-black cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer" onClick={handleSubmit}>
              {loading ? "Submitting..." : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SetBudget;
