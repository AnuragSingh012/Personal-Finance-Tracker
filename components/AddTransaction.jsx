"use client";

import React, { useState } from "react";
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

const AddTransaction = ({ refreshUser }) => {
  const [category, setCategory] = useState("");
  const [customCategory, setCustomCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [payee, setPayee] = useState("");
  const [type, setType] = useState("income");
  const [loading, setLoading] = useState(false);

  const predefinedCategories = [
    "Salary",
    "Grocery",
    "Rent",
    "Entertainment",
    "Investment",
    "Other",
  ];

  const handleSubmit = async () => {
    const userId = localStorage.getItem("userId");
  
    if (!userId) {
      alert("User not found. Please login.");
      return;
    }
  
    const finalCategory = category === "Other" ? customCategory : category;
  
    if (!finalCategory || !amount || !payee) {
      alert("Please fill in all fields.");
      return;
    }
  
    const transactionData = {
      userId,
      category: finalCategory,
      amount,
      payee,
      type,
    };
  
    setLoading(true);
  
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transactionData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setCategory("");
        setCustomCategory("");
        setAmount("");
        setPayee("");
        setType("income");
  
        refreshUser();
      } else {
        alert(data.message || "Error adding transaction.");
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
          <Button className="bg-black text-white cursor-pointer" variant="outline">
            + Add New Transaction
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent className="bg-[#0d1424]">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the details of the new transaction below.
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

            <div className="flex flex-col">
              <label htmlFor="payee" className="text-sm text-white">Payee</label>
              <input
                type="text"
                id="payee"
                value={payee}
                onChange={(e) => setPayee(e.target.value)}
                placeholder="Enter payee name"
                className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="type" className="text-sm text-white">Type</label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
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

export default AddTransaction;
