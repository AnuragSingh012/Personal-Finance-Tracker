"use client"

import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="w-full text-white">
      <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-6 sm:px-10 gap-4">
        <div className="text-2xl font-bold"><Link href="/dashboard">Logo</Link></div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="sm:hidden block text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <span className="text-white">✖</span>
          ) : (
            <span className="text-white">☰</span>
          )}
        </button>

        {/* Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:flex sm:flex-row gap-4 sm:gap-10 text-md font-medium sm:text-base transition-all duration-300 ease-in-out`}
        >
          <Link
            href="/dashboard"
            className="hover:text-purple-400 transition-colors duration-200 px-4"
          >
            Dashboard
          </Link>
          <Link
            href="/transactions"
            className="hover:text-purple-400 transition-colors duration-200 px-4"
          >
            Transactions
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
