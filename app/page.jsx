import TransactionCard from "@/components/TransactionCard";
import RecentTransaction from "@/components/RecentTransaction";
import Statistics from "@/components/Statistics";

export default function Home() {
  return (
    <div className="container">
      <section className="my-8">
        <h1 className="text-4xl">Welcome Back, ChatGPT</h1>
        <p>This is your Personal Finance Tracker</p>
      </section>
      <section>
        <h2 className="text-3xl font-bold">Dashboard</h2>
        <div className="bg-gradient-to-r from-[#0b100e] via-[#0b100e] to-[#439890] px-6 py-6 mt-6 rounded-2xl">
            <TransactionCard />
        </div>
      </section>
      <section>
        <div className="flex flex-wrap gap-10 justify-between py-6">
          <RecentTransaction />
          <Statistics/>
        </div>
      </section>
    </div>
  );
}
