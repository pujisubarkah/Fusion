"use client";
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { FiBarChart2, FiPieChart, FiTrendingUp, FiTrendingDown, FiMapPin } from "react-icons/fi";

const barData = [
  { name: "2021", value: 60 },
  { name: "2022", value: 80 },
  { name: "2023", value: 100 },
  { name: "2024", value: 120 },
];
const pieData = [
  { name: "Madya", value: 45 },
  { name: "Muda", value: 75 },
];
const COLORS = ["#2563eb", "#60a5fa", "#1e40af", "#38bdf8"];
const trendData = [
  { month: "Jan", value: 80 },
  { month: "Feb", value: 90 },
  { month: "Mar", value: 100 },
  { month: "Apr", value: 110 },
  { month: "Mei", value: 120 },
];
const provinsiData = [
  { provinsi: "DKI Jakarta", pertama: 2, muda: 20, madya: 15, utama: 3 },
  { provinsi: "Jawa Barat", pertama: 1, muda: 18, madya: 13, utama: 3 },
  { provinsi: "Jawa Timur", pertama: 0, muda: 15, madya: 12, utama: 3 },
  { provinsi: "Jawa Tengah", pertama: 1, muda: 12, madya: 10, utama: 2 },
  { provinsi: "Sumatera Utara", pertama: 0, muda: 10, madya: 8, utama: 2 },
  { provinsi: "Bali", pertama: 0, muda: 5, madya: 4, utama: 1 },
];
const growth = 8;
const isGrowthUp = growth >= 0;

export default function AnalyticAKPage() {
  return (
    <div className="p-8 flex flex-col gap-10 bg-gradient-to-br from-blue-100 via-white to-blue-300 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Data Analytic Analis Kebijakan</h1>

      {/* Growth Indicator */}
      <div className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl shadow border border-blue-200 w-fit mb-4">
        {isGrowthUp ? (
          <FiTrendingUp className="text-green-600 text-xl" />
        ) : (
          <FiTrendingDown className="text-red-600 text-xl" />
        )}
        <span className={`font-bold ${isGrowthUp ? "text-green-700" : "text-red-700"}`}>{growth}%</span>
        <span className="text-blue-800 ml-1">pertumbuhan AK tahun ini</span>
      </div>

      {/* Line Chart Trend */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-400 relative overflow-hidden">
        <h3 className="font-bold text-xl mb-4 text-blue-800 z-10">Tren Total AK per Bulan</h3>
        <div className="w-full h-64 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trendData}>
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-blue-700 font-medium text-sm">Lonjakan tertinggi pada bulan Mei</div>
      </div>

      {/* Bar & Pie Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-300 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-blue-900 z-10">Bar Chart AK per Tahun</h3>
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
          <div className="mt-2 text-blue-700 font-medium text-sm">Pertumbuhan stabil setiap tahun, dengan kenaikan signifikan di 2024.</div>
        </div>
        <div className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border-t-4 border-blue-200 relative overflow-hidden">
          <h3 className="font-bold text-xl mb-4 text-blue-700 z-10">Pie Chart Jenjang AK</h3>
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
          <div className="mt-2 text-blue-700 font-medium text-sm">Komposisi didominasi oleh jenjang Muda.</div>
        </div>
      </div>

      {/* Analytic per Provinsi: Summary, Grafik, Tabel */}
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 mt-8 border-t-4 border-blue-500 relative overflow-hidden flex flex-col gap-8">
        {/* Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiMapPin className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Total Provinsi</div>
              <div className="text-xl font-bold text-blue-900">6</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiBarChart2 className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Total AK</div>
              <div className="text-xl font-bold text-blue-900">160</div>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 border-l-4 border-blue-400 rounded-xl p-4 shadow">
            <FiPieChart className="text-blue-500 text-2xl" />
            <div>
              <div className="text-xs text-blue-700 font-semibold">Provinsi Terbanyak</div>
              <div className="text-xl font-bold text-blue-900">DKI Jakarta</div>
            </div>
          </div>
        </div>
        {/* Grafik Bar Horizontal */}
        <div className="w-full h-80 flex items-center justify-center text-gray-400 z-10">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={provinsiData.map(row => ({ provinsi: row.provinsi, value: row.pertama + row.muda + row.madya + row.utama }))}
              layout="vertical"
              margin={{ left: 30, right: 30, top: 10, bottom: 10 }}
            >
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="provinsi" type="category" width={120} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb">
                {provinsiData.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Tabel Data */}
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full text-sm text-blue-900 border border-blue-200 rounded-xl overflow-hidden">
            <thead className="bg-blue-100">
              <tr>
                <th className="px-4 py-2 text-left">Provinsi</th>
                <th className="px-4 py-2 text-right">Pertama</th>
                <th className="px-4 py-2 text-right">Muda</th>
                <th className="px-4 py-2 text-right">Madya</th>
                <th className="px-4 py-2 text-right">Utama</th>
                <th className="px-4 py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {provinsiData.map((row, idx) => {
                const total = row.pertama + row.muda + row.madya + row.utama;
                return (
                  <tr key={row.provinsi} className={idx % 2 === 0 ? "bg-white" : "bg-blue-50"}>
                    <td className="px-4 py-2">{row.provinsi}</td>
                    <td className="px-4 py-2 text-right">{row.pertama}</td>
                    <td className="px-4 py-2 text-right">{row.muda}</td>
                    <td className="px-4 py-2 text-right">{row.madya}</td>
                    <td className="px-4 py-2 text-right">{row.utama}</td>
                    <td className="px-4 py-2 text-right font-semibold">{total}</td>
                  </tr>
                );
              })}
              {/* Total row */}
              <tr className="bg-blue-200 font-bold">
                <td className="px-4 py-2 text-right">Total</td>
                <td className="px-4 py-2 text-right">{provinsiData.reduce((a,b)=>a+b.pertama,0)}</td>
                <td className="px-4 py-2 text-right">{provinsiData.reduce((a,b)=>a+b.muda,0)}</td>
                <td className="px-4 py-2 text-right">{provinsiData.reduce((a,b)=>a+b.madya,0)}</td>
                <td className="px-4 py-2 text-right">{provinsiData.reduce((a,b)=>a+b.utama,0)}</td>
                <td className="px-4 py-2 text-right font-semibold">{provinsiData.reduce((a,b)=>a+b.pertama+b.muda+b.madya+b.utama,0)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
