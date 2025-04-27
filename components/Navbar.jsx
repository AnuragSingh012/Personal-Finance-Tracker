"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full text-white">
      <div className="flex justify-center sm:justify-start items-center py-4 px-6 sm:px-10">
        <div className="text-2xl font-bold">
          <Link href="/dashboard">Logo</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
