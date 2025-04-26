"use client"

import React, { useState } from 'react'
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

const page = () => {
  // State to hold transaction details
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [payee, setPayee] = useState('');
  const [type, setType] = useState('income');  // Default type as 'income'
  const [loading, setLoading] = useState(false);

  const router = useRouter();  // To redirect after successful submission

  // Function to handle form submission
  const handleSubmit = async () => {
    // Get the userId from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert("User not found. Please login.");
      return;
    }

    // Prepare the data to be sent
    const transactionData = {
      userId,
      category,
      amount,
      payee,
      type,
    };

    setLoading(true);

    try {
      // Send the data to backend
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      
      if (response.ok) {
        alert('Transaction added successfully!');
        router.push('/dashboard');  // Redirect to dashboard after success
      } else {
        alert(data.message || 'Error adding transaction');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-black text-white border-0 cursor-pointer" variant="outline">+ Add New</Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#0d1424]">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Transaction</AlertDialogTitle>
            <AlertDialogDescription>
              Please enter the details of the new transaction below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 px-4 py-6">
            {/* Input Fields */}
            <div className="flex flex-col">
              <label htmlFor="category" className="text-sm text-white">Category</label>
              <input 
                type="text" 
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category (e.g., Salary, Grocery)"
                className="mt-1 p-2 rounded-md bg-[#1b2a3a] text-white"
              />
            </div>
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
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
              {loading ? 'Submitting...' : 'Submit'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default page;
