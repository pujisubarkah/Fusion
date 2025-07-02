import React from "react";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function AnalyticAKLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-0 md:p-8">{children}</main>
      </div>
    </div>
  );
}
