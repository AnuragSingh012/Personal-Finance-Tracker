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

import { saveUserToLocalStorage } from "@/utils/localStorage";

export default function Home() {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    const responseData = await res.json();

    if (res.ok) {
      saveUserToLocalStorage(responseData.user._id, responseData.user.name);
      setIsDialogOpen(false);
      router.push("/dashboard");
    } else {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative px-6 min-h-screen w-full bg-[#000319] overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#000319_1px,transparent_1px),linear-gradient(to_bottom,#000319_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="absolute left-0 right-0 top-[-20%] h-[1000px] w-[1000px] mx-auto rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000319)]"></div>

      <div className="relative z-10 flex flex-col items-center min-h-screen px-4 py-12">
        <header className="text-center max-w-2xl">
          <h1 className="text-5xl sm:text-6xl mt-12 font-medium leading-[1.15]">
            Take Control of Your <br className="max-md:hidden" />
            <span>Money,</span>
            <span className="bg-gradient-to-r from-[#8b5cf6] to-pink-500 bg-clip-text text-transparent"> Effortlessly</span>
          </h1>
          <h2 className="mt-6 text-lg sm:text-xl text-gray-300">
            Track your spending, set smart budgets, and visualize your financial habits—all in one simple, beautiful app.
          </h2>
        </header>

        <section className="flex justify-center items-center mt-10 w-full max-w-md">
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger
              className="bg-[#000319] border border-white px-6 py-3 rounded-lg cursor-pointer font-medium text-white shadow-lg hover:bg-[#434343]"
              onClick={() => setIsDialogOpen(true)}
            >
              Get Started
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#000319] text-white border-0 max-w-sm w-full p-6 rounded-lg shadow-xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold">
                  Welcome! 🚀
                </AlertDialogTitle>
                <AlertDialogDescription className="text-sm text-gray-400 mt-2">
                  Enter your Name
                </AlertDialogDescription>
              </AlertDialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                <div className="flex flex-col space-y-3">
                  <label className="block text-sm font-medium text-white">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-md bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <AlertDialogAction
                  type="submit"
                  className="w-full bg-white text-black hover:bg-[#cec2c2] cursor-pointer py-3 rounded-lg"
                  disabled={!name.trim() || submitting}
                >
                  {submitting ? (
                    <span className="flex justify-center items-center">
                      <div className="w-5 h-5 border-4 border-t-4 border-gray-600 rounded-full animate-spin"></div>
                    </span>
                  ) : (
                    "Go to Dashboard"
                  )}
                </AlertDialogAction>
              </form>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
}
