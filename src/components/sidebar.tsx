'use client';
import React, { useState } from "react";
import { FiUserCheck, FiBookOpen, FiBarChart2, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  const handleToggle = (menu: string) => {
    setOpen(open === menu ? null : menu);
  };

  return (
    <aside className="w-64 min-h-screen bg-[#3781c7] border-r border-blue-900 shadow-xl flex flex-col p-6 text-white relative overflow-hidden">
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 opacity-20 rounded-full blur-2xl z-0" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-800 opacity-30 rounded-full blur-2xl z-0" />
      <h1 className="mb-2 tracking-widest text-yellow-400 drop-shadow z-10 flex items-end">
        <span className="text-5xl font-extrabold leading-none">F</span>
        <span className="text-lg font-bold ml-1 mb-1">usion</span>
      </h1>
      <div className="mb-8 text-white text-base font-medium tracking-wide z-10">
        Fungsional Online
      </div>
      <div className="border-b-4 border-yellow-400 w-full mb-4 z-10" />
      <nav className="flex flex-col gap-4 text-lg font-semibold z-10">
        {/* Analis Kebijakan */}
        <div>
          <button
            onClick={() => handleToggle('ak')}
            className="flex items-center gap-3 px-4 py-2 w-full rounded transition-colors hover:bg-yellow-400 hover:text-blue-900 shadow-md border-0 focus:outline-none"
          >
            <FiUserCheck className="text-2xl" /> Analis Kebijakan
            <FiChevronDown className={`ml-auto transition-transform ${open === 'ak' ? 'rotate-180' : ''}`} />
          </button>
          {open === 'ak' && (
            <div className="ml-10 mt-2 flex flex-col gap-2 text-base font-normal">
              <Link href="/admin/jumlah-ak" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Jumlah AK</Link>
              <Link href="/admin/analytic-ak" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Data Analytic</Link>
            </div>
          )}
        </div>
        {/* Widyaiswara */}
        <div>
          <button
            onClick={() => handleToggle('wi')}
            className="flex items-center gap-3 px-4 py-2 w-full rounded transition-colors hover:bg-yellow-400 hover:text-blue-900 shadow-md border-0 focus:outline-none"
          >
            <FiBookOpen className="text-2xl" /> Widyaiswara
            <FiChevronDown className={`ml-auto transition-transform ${open === 'wi' ? 'rotate-180' : ''}`} />
          </button>
          {open === 'wi' && (
            <div className="ml-10 mt-2 flex flex-col gap-2 text-base font-normal">
              <Link href="/user/widyaiswara" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Jumlah</Link>
              <Link href="/user/analytic-wi" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Data Analytic</Link>
            </div>
          )}
        </div>
        {/* Analis Bangkom */}
        <div>
          <button
            onClick={() => handleToggle('ab')}
            className="flex items-center gap-3 px-4 py-2 w-full rounded transition-colors hover:bg-yellow-400 hover:text-blue-900 shadow-md border-0 focus:outline-none"
          >
            <FiBarChart2 className="text-2xl" /> Analis Bangkom
            <FiChevronDown className={`ml-auto transition-transform ${open === 'ab' ? 'rotate-180' : ''}`} />
          </button>
          {open === 'ab' && (
            <div className="ml-10 mt-2 flex flex-col gap-2 text-base font-normal">
              <Link href="/jumlah-ab" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Jumlah</Link>
              <Link href="/analytic-ab" className="px-2 py-1 rounded hover:bg-yellow-200 hover:text-blue-900 transition-colors">Data Analytic</Link>
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
