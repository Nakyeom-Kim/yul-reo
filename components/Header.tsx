"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="flex justify-between items-center px-8 md:px-12 py-8 w-full z-50 absolute top-0 pointer-events-none">
      {/* Logo */}
      <Link href="/" className="hover:opacity-50 transition-opacity z-50 pointer-events-auto">
        <img src="/symbol.svg" alt="RUL-REO" className="h-10 md:h-12 w-auto" />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase pointer-events-auto">
        <Link href="/brand" className="hover:opacity-50 transition-opacity">Brand</Link>
        <Link href="/sound" className="hover:opacity-50 transition-opacity">Sound</Link>
        <Link href="/profile" className="hover:opacity-50 transition-opacity">Profile</Link>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden flex flex-col gap-[6px] p-2 z-50 pointer-events-auto"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle Menu"
      >
        <span className={`block w-6 h-[2px] bg-black transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}></span>
        <span className={`block w-6 h-[2px] bg-black transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
        <span className={`block w-6 h-[2px] bg-black transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}></span>
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`fixed inset-0 bg-[#fbfcfa]/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${isMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-full pointer-events-none"}`}>
        <nav className="flex flex-col items-center gap-12 text-2xl font-light tracking-[0.3em] uppercase">
          <Link href="/brand" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Brand</Link>
          <Link href="/sound" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Sound</Link>
          <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="hover:opacity-50 transition-opacity">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
