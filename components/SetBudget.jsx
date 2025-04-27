"use client";

import React, { useState, useEffect } from "react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

const SetBudget = ({ refreshUser }) => {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentMonth, setCurrentMonth] = useState("");

  const predefinedCategories = ["Salary", "Grocery", "Rent", "Entertainment", "Investment", "Other"];

  useEffect(() => {
    const month = new Date().toLocaleString('default', { month: 'long' });
    setCurrentMonth(month);
  }, []);

  const handleSubmit = async () => {
    if (!category || !amount) {
      alert("Please fill in all fields.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not found. Please login.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory.trim() : category;
    if (!finalCategory) {
      alert("Please enter a custom category name.");
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/budget", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, month: currentMonth, category: finalCategory, amount: numericAmount }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Budget updated successfully!");
        setCategory("");
        setCustomCategory("");
        setAmount("");
        refreshUser();
      } else {
        alert(data.message || "Failed to update budget.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-6">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-black text-white" variant="outline">
            Set Monthly Budget
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-[#0d1424]">
          <AlertDialogHeader>
            <AlertDialogTitle>Set Monthly Budget</AlertDialogTitle>
            <AlertDialogDescription>Fill in the budget details below.</AlertDialogDescription>
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
                {predefinedCategories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
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
            <AlertDialogCancel className="bg-white text-black">Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={handleSubmit} className="cursor-pointer">
              {loading ? "Submitting..." : "Submit"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SetBudget;
