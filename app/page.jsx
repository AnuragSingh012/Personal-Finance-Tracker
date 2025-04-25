"use client";

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
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Name:", name);
    router.push(`/dashboard?name=${encodeURIComponent(name)}`);
  };

  return (
    <div className="relative px-6 min-h-screen w-full bg-[#000319] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000319_1px,transparent_1px),linear-gradient(to_bottom,#000319_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-20%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000319)]"></div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-10">
        <header className="text-center max-w-2xl">
          <h1 className="text-5xl sm:text-6xl mt-30 font-medium leading-[1.15]">
            Take Control of Your <br className="max-md:hidden" />
            <span>Money,</span>
            <span className="bg-gradient-to-r from-[#8b5cf6] to-pink-500 bg-clip-text text-transparent"> Effortlessly</span>
          </h1>
          <h2 className="mt-5 text-lg sm:text-xl text-gray-300">
            Track your spending, set smart budgets, and visualize your financial habits—all in one simple, beautiful app.
          </h2>
        </header>

        <section className="flex justify-center items-center mt-10 w-full max-w-md">
          <AlertDialog>
            <AlertDialogTrigger className="bg-[#000319] border border-white px-5 py-3 rounded-lg cursor-pointer font-medium text-white">
              Get Started
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#000319] text-white border-0 max-w-sm w-full">
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-white">
                  Enter your name:
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <AlertDialogAction
                  type="submit"
                  className="w-full bg-white text-black hover:bg-[#cec2c2] cursor-pointer"
                  disabled={!name.trim()}
                >
                  Go to Dashboard
                </AlertDialogAction>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
}
