"use client";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts";
import { FiBarChart2, FiPieChart, FiTrendingUp, FiTrendingDown, FiMapPin } from "react-icons/fi";
import CountUp from "react-countup";

// Define a color palette for chart cells
const COLORS = ["#2563eb", "#38bdf8", "#fbbf24", "#f87171", "#34d399", "#a78bfa", "#f472b6", "#facc15", "#60a5fa", "#f472b6"];

export default function AnalyticAKPage() {
  type Summary = {
    pendidikan: Record<string, number>;
    jenjang: Record<string, number>;
    golongan: Record<string, number>;
    instansi: Record<string, number>;
    jalur: Record<string, number>;
    jenis_kelamin: Record<string, number>;
    tahun: Record<string, number>;
  };
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pegawai/summary")
      .then((res) => res.json())
      .then((data) => {
        setSummary(data);
        setLoading(false);
      });
  }, []);

  if (loading || !summary) return <div className="p-8">Loading...</div>;

  // Helper: convert object to array for recharts
  const toChartData = (obj: Record<string, number>) =>
    Object.entries(obj).map(([name, value]) => ({ name, value })).filter(d => d.name !== "Tidak Diketahui");

  // Chart data
  const kelaminData = toChartData(summary.jenis_kelamin);
  const tahunData = toChartData(summary.tahun).sort((a, b) => a.name.localeCompare(b.name));
  const jalurData = toChartData(summary.jalur);
  const instansiData = toChartData(summary.instansi).sort((a, b) => b.value - a.value).slice(0, 10); // top 10
  const pendidikanData = toChartData(summary.pendidikan);

  // Summary
  const totalProv = Object.keys(summary.instansi).length;
  const totalAKAllProv = Object.values(summary.instansi).reduce((a, b) => a + b, 0);
  const provTerbanyak = instansiData.length > 0 ? instansiData[0].name : "-";
  const growth = 8; // Dummy, replace with real calculation if available
  const isGrowthUp = growth >= 0;

  // Chart data mapping
  const barData = tahunData;
  const pieData = kelaminData;
  // Provinsi data for table and chart (hanya total, tidak ada breakdown jenjang)
  const provinsiData = instansiData.map(inst => ({ provinsi: inst.name, total: inst.value }));

  return (
    <div className="p-8 flex flex-col gap-10 min-h-screen relative overflow-hidden">
      {/* Ultra Dynamic Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 animate-gradient-x"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-40 w-72 h-72 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-float animation-delay-4000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-blob-float animation-delay-6000"></div>
          
          {/* Floating Particles */}
          <div className="absolute top-10 left-10 w-4 h-4 bg-white/40 rounded-full animate-float delay-100"></div>
          <div className="absolute top-32 right-40 w-6 h-6 bg-white/30 rounded-full animate-float delay-200"></div>
          <div className="absolute bottom-20 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-float delay-300"></div>
          <div className="absolute top-1/3 left-2/3 w-3 h-3 bg-white/50 rounded-full animate-float delay-400"></div>
          <div className="absolute bottom-32 right-20 w-5 h-5 bg-white/25 rounded-full animate-float delay-500"></div>
        </div>
      </div>

      {/* Ultra Modern Header Section */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
        <div className="relative bg-white/40 backdrop-blur-2xl rounded-3xl p-10 shadow-2xl border border-white/50 transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex items-center justify-between">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-50 animate-ping"></div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3 drop-shadow-2xl animate-text-glow">
                📊 Analitik Data AK
              </h1>
              <p className="text-gray-700 text-xl font-medium">Dashboard analisis mendalam untuk insight data Akuntansi Keuangan</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Live Analytics</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <div className="text-right">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent animate-count-up">{totalAKAllProv}</div>
                <div className="text-sm text-gray-600 font-medium">Total AK</div>
                <div className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  {isGrowthUp ? <FiTrendingUp /> : <FiTrendingDown />}
                  {growth}% pertumbuhan
                </div>
              </div>
              <div className="relative group cursor-pointer">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur opacity-60 group-hover:opacity-80 transition duration-300"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 transition-all duration-300">
                  <FiBarChart2 className="text-white text-3xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ultra Modern Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Jalur Pengangkatan Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl border border-white/40 transform hover:scale-105 hover:rotate-1 transition-all duration-500">
            <div className="relative">
              <div className="absolute -inset-2 bg-emerald-500/20 rounded-full blur animate-pulse"></div>
              <FiTrendingUp className="relative text-4xl text-emerald-700 drop-shadow-lg animate-bounce" />
            </div>
            <h4 className="font-black text-emerald-800 text-xl text-center">Jalur Pengangkatan Terbanyak</h4>
            <div className="text-4xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-count-up">
              {jalurData.length > 0 ? jalurData[0].name : '-'}
            </div>
            <div className="text-emerald-700 font-bold text-lg">
              {jalurData.length > 0 ? (
                <CountUp end={jalurData[0].value} duration={1.2} separator="." />
              ) : 0} AK
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
          </div>
        </div>

        {/* Pendidikan Card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
          <div className="relative bg-white/85 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl border border-white/40 transform hover:scale-105 hover:-rotate-1 transition-all duration-500">
            <div className="relative">
              <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur animate-pulse"></div>
              <FiBarChart2 className="relative text-4xl text-purple-700 drop-shadow-lg animate-bounce" />
            </div>
            <h4 className="font-black text-purple-800 text-xl text-center">Pendidikan Terbanyak</h4>
            <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent animate-count-up">
              {pendidikanData.length > 0 ? pendidikanData[0].name : '-'}
            </div>
            <div className="text-purple-700 font-bold text-lg">
              {pendidikanData.length > 0 ? (
                <CountUp end={pendidikanData[0].value} duration={1.2} separator="." />
              ) : 0} AK
            </div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Line Chart */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.01] transition-all duration-500">
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 animate-pulse delay-300"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                📈 Tren Total AK per Tahun
              </h3>
            </div>
            
            <div className="w-full h-80 flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={tahunData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <XAxis dataKey="name" className="text-sm font-medium" />
                  <YAxis allowDecimals={false} className="text-sm" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      border: 'none',
                      borderRadius: '12px',
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                      backdropFilter: 'blur(10px)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="url(#colorGradient)" 
                    strokeWidth={4} 
                    dot={{ r: 8, fill: '#2563eb', strokeWidth: 3, stroke: '#fff' }}
                    activeDot={{ r: 12, fill: '#1d4ed8' }}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#2563eb" />
                    </linearGradient>
                  </defs>
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-center">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-100 to-blue-100 px-4 py-2 rounded-full">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-gray-700">Lonjakan tertinggi pada tahun dengan jumlah AK terbanyak</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Bar & Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 3D-style Bar Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Floating decorative elements */}
            <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-6 left-6 w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-500 rounded-full opacity-20 animate-pulse delay-300"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-ping"></div>
                <h3 className="font-black text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  📊 AK per Tahun
                </h3>
              </div>
              
              <div className="w-full h-72 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" className="text-sm font-medium" />
                    <YAxis allowDecimals={false} className="text-sm" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Pertumbuhan stabil dengan kenaikan signifikan di 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D-style Pie Chart */}
        <div className="relative group">
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden transform hover:scale-[1.02] transition-all duration-500">
            {/* Floating decorative elements */}
            <div className="absolute top-6 left-4 w-4 h-4 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-30 animate-float"></div>
            <div className="absolute bottom-4 right-6 w-5 h-5 bg-gradient-to-r from-purple-400 to-violet-500 rounded-full opacity-30 animate-float delay-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full animate-ping"></div>
                <h3 className="font-black text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  🥧 Komposisi Jenis Kelamin
                </h3>
              </div>
              
              <div className="w-full h-72 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-pie-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{
                        paddingTop: '20px',
                        fontSize: '14px',
                        fontWeight: '600'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Distribusi gender dalam profesi AK</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ultra Modern Provinsi Analytics */}
      <div className="relative group">
        <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 overflow-hidden">
          {/* Floating decorative elements */}
          <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-6 left-6 w-4 h-4 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full opacity-20 animate-pulse delay-300"></div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-ping"></div>
              <h3 className="font-black text-2xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                🏛️ Analisis per Instansi
              </h3>
            </div>

            {/* Enhanced Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/60 transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur animate-pulse"></div>
                    <FiMapPin className="relative text-blue-600 text-3xl" />
                  </div>
                  <div>
                    <div className="text-xs text-blue-700 font-bold uppercase tracking-wider">Total Instansi</div>
                    <div className="text-2xl font-black text-blue-900">
                      <CountUp end={totalProv} duration={1.2} separator="." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/60 transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-emerald-500/20 rounded-full blur animate-pulse"></div>
                    <FiBarChart2 className="relative text-emerald-600 text-3xl" />
                  </div>
                  <div>
                    <div className="text-xs text-emerald-700 font-bold uppercase tracking-wider">Total AK</div>
                    <div className="text-2xl font-black text-emerald-900">
                      <CountUp end={totalAKAllProv} duration={1.2} separator="." />
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl blur opacity-40 group-hover:opacity-60 transition duration-300"></div>
                <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/60 transform hover:scale-105 transition-all duration-300">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur animate-pulse"></div>
                    <FiPieChart className="relative text-purple-600 text-3xl" />
                  </div>
                  <div>
                    <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">Instansi Terbanyak</div>
                    <div className="text-lg font-black text-purple-900 truncate max-w-[120px]">
                      {provTerbanyak}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Horizontal Bar Chart */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 mb-8 border border-gray-200">
              <h4 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full animate-pulse"></div>
                Top 10 Instansi dengan AK Terbanyak
              </h4>
              <div className="w-full h-96 flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height={380}>
                  <BarChart
                    data={provinsiData}
                    layout="vertical"
                    margin={{ left: 80, right: 40, top: 20, bottom: 20 }}
                  >
                    <XAxis type="number" allowDecimals={false} className="text-sm" />
                    <YAxis dataKey="provinsi" type="category" width={140} className="text-xs" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Bar dataKey="total" radius={[0, 8, 8, 0]}>
                      {provinsiData.map((_, idx) => (
                        <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Enhanced Table */}
            <div className="overflow-x-auto rounded-2xl shadow-2xl">
              <h4 className="font-black text-xl mb-4 text-emerald-700 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                📋 Detail Data per Instansi
              </h4>
              <table className="min-w-full text-left border-collapse bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white">
                    <th className="py-4 px-6 font-bold text-sm tracking-wider">🏛️ Instansi</th>
                    <th className="py-4 px-6 font-bold text-sm tracking-wider text-right">👥 Total AK</th>
                  </tr>
                </thead>
                <tbody>
                  {provinsiData.map((row, idx) => (
                    <tr 
                      key={row.provinsi} 
                      className={`
                        group transition-all duration-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:shadow-lg hover:scale-[1.01] cursor-pointer
                        ${idx % 2 === 0 ? "bg-white/60" : "bg-gradient-to-r from-gray-50/50 to-emerald-50/30"}
                      `}
                    >
                      <td className="py-4 px-6 font-bold text-gray-700 group-hover:text-emerald-600 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {idx + 1}
                          </div>
                          <div className="max-w-xs truncate">{row.provinsi}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right font-black text-emerald-700 group-hover:text-teal-600 transition-colors text-lg">
                        <CountUp end={row.total} duration={1.2} separator="." />
                      </td>
                    </tr>
                  ))}
                  {/* Enhanced Total row */}
                  <tr className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black">
                    <td className="py-4 px-6 text-right font-black text-lg">
                      🎯 TOTAL KESELURUHAN
                    </td>
                    <td className="py-4 px-6 text-right font-black text-xl">
                      <CountUp end={provinsiData.reduce((a,b)=>a+b.total,0)} duration={1.2} separator="." />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
