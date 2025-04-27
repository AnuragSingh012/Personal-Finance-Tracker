"use client";

import TransactionCard from "@/components/TransactionCard";
import RecentTransaction from "@/components/RecentTransaction";
import Statistics from "@/components/Statistics";
import { useEffect, useState } from "react";
import { getUserFromLocalStorage } from "@/utils/localStorage";
import AddTransaction from "@/components/AddTransaction";
import CategoryChart from "@/components/CategoryChart";
import SetBudget from "@/components/SetBudget";

export default function Home() {
  const { userId } = getUserFromLocalStorage(); 
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`);
      const data = await res.json();
      setUser(data.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    fetchUser();
  }, [userId]);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="my-8">
        <h1 className="text-4xl">Welcome, {user.name}</h1>
        <p>This is your Personal Finance Tracker</p>
      </section>
      <section className="flex gap-2">
        <AddTransaction refreshUser={fetchUser} />
        <SetBudget />
      </section>
      <section>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="bg-gradient-to-r from-[#000319] via-[#0d1424] to-[#439890] px-6 py-6 mt-6 rounded-2xl">
          <TransactionCard user={user} />
        </div>
      </section>
      <section>
        <div className="flex flex-wrap gap-10 justify-between py-6">
          <RecentTransaction transactions={user.transactions} />
          <Statistics user={user} />
        </div>
      </section>
      <section>
        <div className="flex justify-center items-center">
            <CategoryChart user={user} />
        </div>
      </section>
    </div>
  );
}
