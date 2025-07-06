"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiArrowLeft, FiPlay, FiClock, FiUsers, FiTrendingUp, FiAward, FiChevronRight } from 'react-icons/fi';

export default function LinimasaPage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const timelineData = [
    {
      id: 1,
      title: "Pengenalan Sistem Fungsional",
      subtitle: "Video Keseluruhan - Gambaran Lengkap",
      description: "Video komprehensif tentang sistem fungsional yang mencakup semua aspek jabatan fungsional dalam pemerintahan Indonesia.",
      videoId: "o9_fcOZIUxE",
      date: "2024",
      category: "Overview",
      color: "from-blue-600 to-blue-800",
      bgColor: "from-blue-50 to-blue-100",
      icon: FiUsers
    },
    {
      id: 2,
      title: "Analis Kebijakan",
      subtitle: "Jabatan Fungsional Strategis",
      description: "Memahami peran dan tanggung jawab Analis Kebijakan dalam merumuskan dan menganalisis kebijakan publik yang efektif.",
      videoId: "PZ1AuvU4fG0",
      date: "2024",
      category: "Analis Kebijakan",
      color: "from-green-600 to-green-800",
      bgColor: "from-green-50 to-green-100",
      icon: FiTrendingUp
    },
    {
      id: 3,
      title: "Widyaiswara",
      subtitle: "Pendidik dan Pengembang SDM",
      description: "Eksplorasi mendalam tentang profesi Widyaiswara sebagai pendidik profesional dalam pengembangan kapasitas aparatur sipil negara.",
      videoId: "A2RXvhHGvW0",
      date: "2024",
      category: "Widyaiswara",
      color: "from-purple-600 to-purple-800",
      bgColor: "from-purple-50 to-purple-100",
      icon: FiAward
    },
    {
      id: 4,
      title: "Analis Bangkom",
      subtitle: "Spesialis Pengembangan Kompetensi",
      description: "Mengenal lebih dekat profesi Analis Pengembangan Kompetensi (Bangkom) dan kontribusinya dalam peningkatan SDM aparatur.",
      videoId: "x_NgKrSS8z4",
      date: "2024",
      category: "Analis Bangkom",
      color: "from-orange-600 to-orange-800",
      bgColor: "from-orange-50 to-orange-100",
      icon: FiClock
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Back to Home */}
            <Link href="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
              <FiArrowLeft className="text-xl" />
              <span className="font-medium">Kembali ke Beranda</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FiUsers className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FUSION
              </span>
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiClock className="text-4xl text-blue-600" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Lini Masa{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FUSION
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Jelajahi perjalanan dan pemahaman mendalam tentang berbagai jabatan fungsional 
            melalui koleksi video edukatif yang komprehensif.
          </p>
        </div>
      </section>

      {/* Video Timeline */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Content Side */}
                <div className="flex-1 space-y-6">
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-medium shadow-lg`}>
                    <item.icon className="text-lg" />
                    {item.category}
                  </div>
                  
                  <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">{item.title}</h2>
                    <h3 className="text-xl text-gray-600 font-medium mb-4">{item.subtitle}</h3>
                    <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setActiveVideo(activeVideo === item.videoId ? null : item.videoId)}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg ${
                        activeVideo === item.videoId
                          ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                          : `bg-gradient-to-r ${item.color} text-white hover:shadow-xl`
                      }`}
                    >
                      <FiPlay className="text-lg" />
                      {activeVideo === item.videoId ? 'Tutup Video' : 'Tonton Video'}
                    </button>
                    
                    <span className="text-gray-500 font-medium">{item.date}</span>
                  </div>
                </div>

                {/* Video Side */}
                <div className="flex-1 w-full">
                  <div className={`bg-gradient-to-br ${item.bgColor} p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group`}>
                    {activeVideo === item.videoId ? (
                      <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0`}
                          title={item.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    ) : (
                      <div 
                        className="aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer relative group-hover:scale-105 transition-transform duration-300"
                        onClick={() => setActiveVideo(item.videoId)}
                      >
                        <Image
                          src={`https://img.youtube.com/vi/${item.videoId}/maxresdefault.jpg`}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center group-hover:bg-opacity-30 transition-all duration-300">
                          <div className="w-20 h-20 bg-gradient-to-r from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <FiPlay className="text-white text-3xl ml-1" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Statistik Video</h2>
            <p className="text-xl text-gray-600">Koleksi video edukatif untuk pengembangan jabatan fungsional</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">{timelineData.length}</div>
              <div className="text-gray-600 font-medium">Total Video</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2">3</div>
              <div className="text-gray-600 font-medium">Jabatan Fungsional</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">2024</div>
              <div className="text-gray-600 font-medium">Tahun Produksi</div>
            </div>
            
            <div className="text-center bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-2">HD</div>
              <div className="text-gray-600 font-medium">Kualitas Video</div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan sistem FUSION dan kelola data fungsional Anda dengan lebih efektif
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Masuk ke Sistem
            <FiChevronRight className="text-xl" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <FiUsers className="text-white text-2xl" />
              </div>
              <span className="text-3xl font-bold">FUSION</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Sistem Informasi Manajemen Data Fungsional untuk kemajuan karir di Indonesia.
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <span>© 2025 FUSION. All rights reserved.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
