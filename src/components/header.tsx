'use client';
import React, { useEffect, useState } from "react";
import { FiBell, FiUser } from "react-icons/fi";

export default function Header() {
  const [nama, setNama] = useState<string>("User");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("user");
      if (user) {
        try {
          const parsed = JSON.parse(user);
          setNama(parsed.nama || "User");
        } catch {
          setNama("User");
        }
      } else {
        setNama("User");
      }
    }
  }, []);

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-[#3781c7] shadow-md border-b-4 border-yellow-400 z-20">
      <div className="flex items-center gap-3">
        <span className="text-2xl font-extrabold text-yellow-400 tracking-widest">F</span>
        <span className="text-lg font-bold text-white">usion</span>
        <span className="ml-4 text-yellow-100 font-medium tracking-wide">Fungsional Online</span>
      </div>
      <div className="flex items-center gap-6">
        <button className="relative p-2 rounded-full hover:bg-blue-900/40 transition">
          <FiBell className="text-2xl text-yellow-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400 text-blue-900 font-semibold hover:bg-white hover:text-blue-900 transition">
          <FiUser className="text-xl" />
          <span>{nama}</span>
        </button>
      </div>
    </header>
  );
}
