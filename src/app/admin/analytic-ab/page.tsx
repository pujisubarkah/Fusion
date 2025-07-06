"use client";
import React, { useState, useEffect } from "react";
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiPieChart,
  FiAward,
  FiTarget,
  FiActivity,
  FiCheckCircle,
  FiArrowUp,
  FiDownload,
  FiRefreshCw
} from "react-icons/fi";
import { FaLaptopCode } from "react-icons/fa";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  Tooltip, 
  ResponsiveContainer, 
  Cell, 
  PieChart, 
  Pie, 
  Legend, 
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Line
} from "recharts";

// Mock data untuk analytics jabatan Analis Bangkom
const mockAnalyticsData = {
  totalAnalisBangkom: 156,
  growth: 12.5,
  activeAnalysis: 89,
  completedAssessments: 234,
  certifications: 78,
  avgCompetencyScore: 87.3,
  
  // Data distribusi jenjang jabatan fungsional
  jenjangDistribution: [
    { name: "Analis Bangkom Pertama", value: 45, percentage: 28.8, color: "#2563eb" },
    { name: "Analis Bangkom Muda", value: 52, percentage: 33.3, color: "#10b981" },
    { name: "Analis Bangkom Madya", value: 41, percentage: 26.3, color: "#f59e0b" },
    { name: "Analis Bangkom Utama", value: 18, percentage: 11.5, color: "#8b5cf6" }
  ],
  
  // Data distribusi golongan
  golonganDistribution: [
    { golongan: "III/a", count: 23, jenjang: "Pertama" },
    { golongan: "III/b", count: 22, jenjang: "Pertama" },
    { golongan: "III/c", count: 34, jenjang: "Muda" },
    { golongan: "III/d", count: 18, jenjang: "Muda" },
    { golongan: "IV/a", count: 25, jenjang: "Madya" },
    { golongan: "IV/b", count: 16, jenjang: "Madya" },
    { golongan: "IV/c", count: 12, jenjang: "Utama" },
    { golongan: "IV/d", count: 6, jenjang: "Utama" }
  ],
  
  // Data aktivitas analisis bulanan
  monthlyActivity: [
    { month: "Jan", analis: 142, analisisKompetensi: 78, assessmentJabatan: 23, evaluasiKinerja: 45 },
    { month: "Feb", analis: 145, analisisKompetensi: 82, assessmentJabatan: 19, evaluasiKinerja: 48 },
    { month: "Mar", analis: 148, analisisKompetensi: 76, assessmentJabatan: 28, evaluasiKinerja: 52 },
    { month: "Apr", analis: 151, analisisKompetensi: 84, assessmentJabatan: 31, evaluasiKinerja: 47 },
    { month: "May", analis: 153, analisisKompetensi: 87, assessmentJabatan: 25, evaluasiKinerja: 55 },
    { month: "Jun", analis: 156, analisisKompetensi: 89, assessmentJabatan: 22, evaluasiKinerja: 58 }
  ],
  
  // Data bidang kompetensi yang dianalisis
  kompetensiAnalysis: [
    { name: "Analisis Jabatan", value: 35, completed: 156, ongoing: 23 },
    { name: "Evaluasi Kompetensi", value: 28, completed: 124, ongoing: 18 },
    { name: "Assessment Center", value: 22, completed: 98, ongoing: 15 },
    { name: "Analisis Beban Kerja", value: 19, completed: 87, ongoing: 12 },
    { name: "Pemetaan Talenta", value: 16, completed: 76, ongoing: 9 },
    { name: "Audit SDM", value: 14, completed: 65, ongoing: 8 },
    { name: "Perencanaan Karir", value: 12, completed: 54, ongoing: 6 },
    { name: "Analisis Budaya Organisasi", value: 10, completed: 43, ongoing: 5 }
  ],
  
  // Data kompetensi inti analis bangkom
  coreCompetencies: [
    { subject: "Analisis Data & Statistik", current: 120, target: 130, fullMark: 150 },
    { subject: "Metodologi Assessment", current: 98, target: 125, fullMark: 150 },
    { subject: "Psikologi Organisasi", current: 86, target: 110, fullMark: 150 },
    { subject: "Manajemen SDM", current: 99, target: 120, fullMark: 150 },
    { subject: "Teknologi HR", current: 85, target: 115, fullMark: 150 },
    { subject: "Komunikasi & Presentasi", current: 105, target: 125, fullMark: 150 }
  ],
  
  // Data instansi tempat bertugas
  instansiData: [
    { name: "Kementerian Keuangan", count: 45, percentage: 28.8, analisAktif: 42 },
    { name: "Kementerian Pendidikan", count: 38, percentage: 24.4, analisAktif: 35 },
    { name: "Kementerian Dalam Negeri", count: 32, percentage: 20.5, analisAktif: 28 },
    { name: "LAN", count: 25, percentage: 16.0, analisAktif: 24 },
    { name: "Kementerian PANRB", count: 16, percentage: 10.3, analisAktif: 15 }
  ],

  // Data sertifikasi khusus analis bangkom
  certificationData: [
    { name: "Certified HR Analytics", holders: 45, validity: "2025-2027" },
    { name: "Assessment Center Certification", holders: 38, validity: "2024-2026" },
    { name: "Competency Mapping Expert", holders: 32, validity: "2025-2028" },
    { name: "Organizational Psychology", holders: 28, validity: "2024-2027" },
    { name: "Data Analytics for HR", holders: 25, validity: "2025-2027" }
  ],

  // Data tingkat pendidikan
  educationLevel: [
    { level: "S1", count: 68, percentage: 43.6 },
    { level: "S2", count: 78, percentage: 50.0 },
    { level: "S3", count: 10, percentage: 6.4 }
  ]
};

export default function AnalyticAnalisBangkomPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("overview");

  useEffect(() => {
    // Simulasi loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-[#C2E7F6]/20 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl"></div>
        </div>
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="mt-4 text-center">
            <div className="text-xl font-bold text-blue-600">Memuat Analytics...</div>
            <div className="text-sm text-gray-600 mt-1">Menganalisis data analis bangkom</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 flex flex-col gap-8 min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gray-50"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#C2E7F6]/40 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-50/60 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative group">
        <div className="relative bg-white rounded-xl p-8 shadow-sm border border-gray-200 transform hover:scale-[1.01] transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <h1 className="text-4xl font-black text-orange-600 mb-3">
                📊 Analytics Analis Bangkom
              </h1>
              <p className="text-gray-600 text-lg font-medium">Dashboard analisis data analis pengembangan kompetensi</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-emerald-600 text-sm font-medium">Real-time Analytics</span>
              </div>
            </div>
            
            {/* Control Panel */}
            <div className="flex items-center gap-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 text-gray-700 font-medium"
              >
                <option value="1month">1 Bulan Terakhir</option>
                <option value="3months">3 Bulan Terakhir</option>
                <option value="6months">6 Bulan Terakhir</option>
                <option value="1year">1 Tahun Terakhir</option>
              </select>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-all duration-300">
                <FiDownload className="text-sm" />
                Export
              </button>
              
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300">
                <FiRefreshCw className="text-sm" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Analis Bangkom */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <FaLaptopCode className="text-orange-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <FiArrowUp className="text-xs" />
                +{mockAnalyticsData.growth}%
              </div>
            </div>
            <div className="text-3xl font-black text-orange-600 mb-1">{mockAnalyticsData.totalAnalisBangkom}</div>
            <div className="text-gray-600 font-medium text-sm">Total Analis Bangkom</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Active Analysis */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FiTarget className="text-blue-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <FiArrowUp className="text-xs" />
                +8.2%
              </div>
            </div>
            <div className="text-3xl font-black text-blue-600 mb-1">{mockAnalyticsData.activeAnalysis}</div>
            <div className="text-gray-600 font-medium text-sm">Analisis Aktif</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Completed Assessments */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <FiCheckCircle className="text-emerald-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <FiArrowUp className="text-xs" />
                +15.3%
              </div>
            </div>
            <div className="text-3xl font-black text-emerald-600 mb-1">{mockAnalyticsData.completedAssessments}</div>
            <div className="text-gray-600 font-medium text-sm">Assessment Selesai</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Average Competency Score */}
        <div className="relative group">
          <div className="relative bg-white rounded-xl p-6 shadow-sm border border-gray-200 transform hover:scale-105 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <FiActivity className="text-purple-600 text-xl" />
              </div>
              <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                <FiArrowUp className="text-xs" />
                +3.1%
              </div>
            </div>
            <div className="text-3xl font-black text-purple-600 mb-1">{mockAnalyticsData.avgCompetencyScore}%</div>
            <div className="text-gray-600 font-medium text-sm">Skor Kompetensi Rata-rata</div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="flex items-center gap-4 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-2">
          <FiBarChart2 className="text-orange-600 text-lg" />
          <span className="font-bold text-gray-700">Pilih Analisis:</span>
        </div>
        <div className="flex gap-2">
          {[
            { id: "overview", label: "Overview Jabatan", icon: FiTrendingUp },
            { id: "jenjang", label: "Distribusi Jenjang", icon: FiPieChart },
            { id: "kompetensi", label: "Analisis Kompetensi", icon: FiActivity },
            { id: "sertifikasi", label: "Sertifikasi", icon: FiAward }
          ].map((chart) => {
            const Icon = chart.icon;
            return (
              <button
                key={chart.id}
                onClick={() => setActiveChart(chart.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  activeChart === chart.id
                    ? 'bg-orange-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="text-sm" />
                {chart.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Chart Content */}
      {activeChart === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Activity Trend */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-orange-600">
                  📈 Aktivitas Analisis Bulanan
                </h3>
              </div>
              
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={mockAnalyticsData.monthlyActivity}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="month" className="text-sm font-medium" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="analis" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Line type="monotone" dataKey="analisisKompetensi" stroke="#10b981" strokeWidth={3} />
                    <Line type="monotone" dataKey="assessmentJabatan" stroke="#2563eb" strokeWidth={3} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Competency Analysis Distribution */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-blue-600">
                  🎯 Bidang Analisis Kompetensi
                </h3>
              </div>
              
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.kompetensiAnalysis} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis type="number" className="text-sm" />
                    <YAxis dataKey="name" type="category" className="text-xs" width={120} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="value" fill="#2563eb" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeChart === "jenjang" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Jenjang Distribution */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-purple-600">
                  🏆 Distribusi Jenjang Jabatan
                </h3>
              </div>
              
              <div className="w-full h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockAnalyticsData.jenjangDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ percentage }) => `${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {mockAnalyticsData.jenjangDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Golongan Distribution */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-emerald-600">
                  � Distribusi Golongan
                </h3>
              </div>
              
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockAnalyticsData.golonganDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="golongan" className="text-sm font-medium" />
                    <YAxis className="text-sm" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255,255,255,0.95)',
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeChart === "kompetensi" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Core Competencies Radar */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-purple-600">
                  🎯 Kompetensi Inti Analis Bangkom
                </h3>
              </div>
              
              <div className="w-full h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={mockAnalyticsData.coreCompetencies}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" className="text-xs" />
                    <PolarRadiusAxis angle={90} domain={[0, 150]} className="text-xs" />
                    <Radar
                      name="Current"
                      dataKey="current"
                      stroke="#8b5cf6"
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Target"
                      dataKey="target"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Education Level Distribution */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-emerald-600">
                  � Tingkat Pendidikan
                </h3>
              </div>
              
              <div className="space-y-6">
                {mockAnalyticsData.educationLevel.map((education) => (
                  <div key={education.level} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-700">{education.level}</span>
                      <span className="text-lg font-black text-gray-900">{education.count} orang</span>
                    </div>
                    <div className="relative">
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div 
                          className="h-4 rounded-full transition-all duration-1000 bg-blue-500"
                          style={{ width: `${education.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-500 font-medium">
                      {education.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeChart === "sertifikasi" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Certification Holdings */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-orange-600">
                  � Sertifikasi Analis Bangkom
                </h3>
              </div>
              
              <div className="space-y-4">
                {mockAnalyticsData.certificationData.map((cert) => (
                  <div key={cert.name} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-gray-800">{cert.name}</h4>
                      <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold">
                        {cert.holders} orang
                      </span>
                    </div>
                    <div className="text-xs text-gray-600">
                      Berlaku: {cert.validity}
                    </div>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(cert.holders / mockAnalyticsData.totalAnalisBangkom) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Institution Performance */}
          <div className="relative group">
            <div className="relative bg-white rounded-xl shadow-sm p-8 border border-gray-200 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h3 className="font-black text-2xl text-blue-600">
                  🏢 Analis Aktif per Instansi
                </h3>
              </div>
              
              <div className="space-y-4">
                {mockAnalyticsData.instansiData.map((instansi) => (
                  <div key={instansi.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">{instansi.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{instansi.analisAktif}/{instansi.count}</div>
                        <div className="text-xs text-gray-500">aktif dari total</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="relative h-3 rounded-full overflow-hidden">
                        <div 
                          className="bg-gray-300 h-3 rounded-full absolute"
                          style={{ width: `${(instansi.count / mockAnalyticsData.totalAnalisBangkom) * 100}%` }}
                        ></div>
                        <div 
                          className="bg-blue-500 h-3 rounded-full absolute"
                          style={{ width: `${(instansi.analisAktif / mockAnalyticsData.totalAnalisBangkom) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Total: {instansi.percentage}%</span>
                      <span>Aktif: {((instansi.analisAktif / instansi.count) * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FiCheckCircle className="text-blue-600 text-lg" />
            </div>
            <div>
              <div className="text-2xl font-black text-blue-600">{mockAnalyticsData.certifications}</div>
              <div className="text-sm text-gray-600 font-medium">Total Sertifikasi Aktif</div>
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium">+23% dari bulan lalu</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <FiTrendingUp className="text-emerald-600 text-lg" />
            </div>
            <div>
              <div className="text-2xl font-black text-emerald-600">94.2%</div>
              <div className="text-sm text-gray-600 font-medium">Tingkat Akurasi Analisis</div>
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium">+5.2% dari bulan lalu</div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <FiActivity className="text-orange-600 text-lg" />
            </div>
            <div>
              <div className="text-2xl font-black text-orange-600">87.3%</div>
              <div className="text-sm text-gray-600 font-medium">Efisiensi Kerja Rata-rata</div>
            </div>
          </div>
          <div className="text-xs text-emerald-600 font-medium">+3.1% dari bulan lalu</div>
        </div>
      </div>
    </div>
  );
}
