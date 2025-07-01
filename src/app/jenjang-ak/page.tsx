"use client";
import React, { useState } from "react";
import { FiUsers, FiBarChart2, FiPieChart, FiTrendingUp, FiTrendingDown } from "react-icons/fi";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line
} from "recharts";

const barData = [
  { name: "Madya", value: 45 },
  { name: "Muda", value: 75 },
];
const pieData = [
  { name: "Madya", value: 45 },
  { name: "Muda", value: 75 },
];
const COLORS = ["#2563eb", "#f472b6"];
const trendData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 100 },
  { month: "Apr", value: 110 },
  { month: "Mei", value: 120 },
];

export default function JenjangAKPage() {
  const [selectedYear, setSelectedYear] = useState("2025");
  // Dummy growth calculation
  const growth = 8; // percent
  const isGrowthUp = growth >= 0;

  return (
    <div className="p-8 flex flex-col gap-10 bg-gradient-to-br from-blue-50 via-white to-yellow-50 min-h-screen">
      {/* Filter & Trend */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-blue-900">Tahun:</span>
          <select
            className="border rounded px-2 py-1 text-blue-900 bg-white focus:outline-yellow-400"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow border border-blue-100">
          {isGrowthUp ? (
            <FiTrendingUp className="text-green-600 text-xl" />
          ) : (
            <FiTrendingDown className="text-red-600 text-xl" />
          )}
          <span className={`font-bold ${isGrowthUp ? "text-green-700" : "text-red-700"}`}>{growth}%</span>
          <span className="text-gray-600 ml-1">pertumbuhan AK tahun ini</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div className="bg-gradient-to-br from-blue-200 to-blue-100 rounded-2xl p-8 flex items-center gap-6 shadow-lg border-b-4 border-blue-400 hover:scale-105 transition-transform">
          <FiUsers className="text-4xl text-blue-700 drop-shadow" />
          <div>
            <div className="text-3xl font-extrabold text-blue-900">120</div>
            <div className="text-blue-800 font-semibold">Total AK</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-yellow-200 to-yellow-100 rounded-2xl p-8 flex items-center gap-6 shadow-lg border-b-4 border-yellow-400 hover:scale-105 transition-transform">
          <FiBarChart2 className="text-4xl text-yellow-600 drop-shadow" />
          <div>
            <div className="text-3xl font-extrabold text-yellow-800">45</div>
            <div className="text-yellow-700 font-semibold">Jenjang Madya</div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-pink-200 to-pink-100 rounded-2xl p-8 flex items-center gap-6 shadow-lg border-b-4 border-pink-400 hover:scale-105 transition-transform">
          <FiPieChart className="text-4xl text-pink-600 drop-shadow" />
          <div>
            <div className="text-3xl font-extrabold text-pink-800">75</div>
            <div className="text-pink-700 font-semibold">Jenjang Muda</div>
          </div>
        </div>
      </div>

      {/* Trend Line Chart */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-green-200 relative overflow-hidden">
        <h3 className="font-bold text-xl mb-4 text-green-700 z-10">Tren Total AK per Bulan</h3>
        <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-200 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 opacity-30 rounded-full blur-2xl z-0" />
          <h3 className="font-bold text-xl mb-4 text-blue-900 z-10">Bar Chart Jenjang AK</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#2563eb">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-pink-200 relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-100 opacity-30 rounded-full blur-2xl z-0" />
          <h3 className="font-bold text-xl mb-4 text-pink-700 z-10">Pie Chart Jenjang AK</h3>
          <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 overflow-x-auto border-l-4 border-yellow-300">
        <h3 className="font-bold text-xl mb-4 text-yellow-700">Tabel Data Jenjang AK</h3>
        <table className="min-w-full text-left border border-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-yellow-100">
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Jenjang</th>
              <th className="py-2 px-4 border-b">Instansi</th>
              <th className="py-2 px-4 border-b">Provinsi</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-yellow-50">
              <td className="py-2 px-4 border-b">1</td>
              <td className="py-2 px-4 border-b">Budi Santoso</td>
              <td className="py-2 px-4 border-b">Madya</td>
              <td className="py-2 px-4 border-b">Kemenkeu</td>
              <td className="py-2 px-4 border-b">DKI Jakarta</td>
            </tr>
            <tr className="hover:bg-yellow-50">
              <td className="py-2 px-4 border-b">2</td>
              <td className="py-2 px-4 border-b">Siti Aminah</td>
              <td className="py-2 px-4 border-b">Muda</td>
              <td className="py-2 px-4 border-b">Kemendikbud</td>
              <td className="py-2 px-4 border-b">Jawa Barat</td>
            </tr>
            <tr className="hover:bg-yellow-50">
              <td className="py-2 px-4 border-b">3</td>
              <td className="py-2 px-4 border-b">Andi Wijaya</td>
              <td className="py-2 px-4 border-b">Madya</td>
              <td className="py-2 px-4 border-b">Kemenkes</td>
              <td className="py-2 px-4 border-b">Jawa Timur</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
