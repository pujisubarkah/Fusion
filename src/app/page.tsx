"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMenu, FiX, FiUsers, FiClock, FiDownload, FiHelpCircle, FiLogIn, FiChevronRight, FiFileText, FiBookOpen, FiDatabase } from 'react-icons/fi';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: 'Beranda', href: '#beranda', icon: FiUsers },
    { name: 'Lini Masa', href: '/linimasa', icon: FiClock },
    { name: 'Unduhan', href: '/unduhan', icon: FiDownload },
    { name: 'FAQ', href: '#faq', icon: FiHelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image 
                src="/lanri.png" 
                alt="Logo LANRI" 
                className="w-12 h-12 rounded-lg border border-gray-200" 
                width={48} 
                height={48} 
              />
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-300">
                <FiUsers className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                FUSION
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105"
                  >
                    <item.icon className="text-lg" />
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 hover:scale-105"
                  >
                    <item.icon className="text-lg" />
                    {item.name}
                  </a>
                )
              ))}
              <Link
                href="/login"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <FiLogIn className="text-lg" />
                Masuk
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-blue-50 transition-colors"
            >
              {isMenuOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-100">
              <div className="flex flex-col space-y-3">
                {navigationItems.map((item) => (
                  item.href.startsWith('/') ? (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-lg" />
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-700 hover:text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <item.icon className="text-lg" />
                      {item.name}
                    </a>
                  )
                ))}
                <Link
                  href="/login"
                  className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg font-medium mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiLogIn className="text-lg" />
                  Masuk
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="beranda" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Selamat Datang di{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                FUSION
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Sistem Informasi Manajemen Data Fungsional untuk Analis Kebijakan. 
              Kelola data pegawai, pantau jenjang karir, dan analisis kinerja dalam satu platform terintegrasi.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <FiLogIn className="text-xl" />
                Mulai Sekarang
                <FiChevronRight className="text-xl" />
              </Link>
              <Link
                href="/unduhan"
                className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105"
              >
                <FiDownload className="text-xl" />
                Pelajari Lebih Lanjut
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Informasi Terkini Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Informasi Terkini</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Update terbaru mengenai uji kompetensi, verifikasi validasi, dan peraturan jabatan fungsional
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <FiDownload className="text-3xl text-blue-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Panduan Uji Kompetensi AK</h3>
              <p className="text-gray-600 mb-4 text-sm">Panduan pelaksanaan uji kompetensi Analis Kebijakan terbaru</p>
              <Link href="/unduhan" className="text-blue-600 font-medium hover:text-blue-800 transition-colors text-sm">Download PDF</Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <FiDownload className="text-3xl text-green-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Daftar Peserta Lulus</h3>
              <p className="text-gray-600 mb-4 text-sm">Daftar nama peserta lulus verifikasi dan validasi uji kompetensi</p>
              <Link href="/unduhan" className="text-green-600 font-medium hover:text-green-800 transition-colors text-sm">Download Excel</Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <FiDownload className="text-3xl text-purple-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Hasil Verval Widyaiswara</h3>
              <p className="text-gray-600 mb-4 text-sm">Hasil verifikasi dan validasi jabatan fungsional Widyaiswara</p>
              <Link href="/unduhan" className="text-purple-600 font-medium hover:text-purple-800 transition-colors text-sm">Download PDF</Link>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <FiDownload className="text-3xl text-orange-600 mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Peraturan Widyaiswara</h3>
              <p className="text-gray-600 mb-4 text-sm">Salinan peraturan terbaru tentang jabatan fungsional Widyaiswara</p>
              <Link href="/unduhan" className="text-orange-600 font-medium hover:text-orange-800 transition-colors text-sm">Download PDF</Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/unduhan"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FiDownload className="text-lg" />
              Lihat Semua Informasi
              <FiChevronRight className="text-lg" />
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Lini Masa Pengembangan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Perjalanan pengembangan sistem FUSION dari konsep hingga implementasi
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Analisis Kebutuhan</h3>
                <p className="text-gray-600">Identifikasi kebutuhan sistem manajemen data fungsional yang komprehensif</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Desain & Pengembangan</h3>
                <p className="text-gray-600">Perancangan arsitektur sistem dan development interface yang user-friendly</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Testing & Implementasi</h3>
                <p className="text-gray-600">Pengujian sistem secara menyeluruh dan implementasi bertahap di berbagai instansi</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pusat Unduhan</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Akses berbagai dokumen, formulir, dan file penting untuk jabatan fungsional Analis Kebijakan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <FiFileText className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Formulir & Template</h3>
              <p className="text-gray-600 mb-6">
                Formulir pengajuan, template laporan, dan dokumen administratif lainnya
              </p>
              <Link href="/unduhan" className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                Lihat Formulir →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <FiBookOpen className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Panduan & Manual</h3>
              <p className="text-gray-600 mb-6">
                Panduan penggunaan sistem, manual prosedur, dan dokumentasi lengkap
              </p>
              <Link href="/unduhan" className="text-green-600 font-medium hover:text-green-800 transition-colors">
                Lihat Panduan →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
                <FiDatabase className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Data & Laporan</h3>
              <p className="text-gray-600 mb-6">
                Data statistik, laporan analisis, dan file backup sistem
              </p>
              <Link href="/unduhan" className="text-purple-600 font-medium hover:text-purple-800 transition-colors">
                Lihat Data →
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/unduhan"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <FiDownload className="text-lg" />
              Kunjungi Pusat Unduhan
              <FiChevronRight className="text-lg" />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">FAQ</h2>
            <p className="text-xl text-gray-600">
              Pertanyaan yang sering diajukan tentang sistem FUSION
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apa itu sistem FUSION?</h3>
              <p className="text-gray-600">
                FUSION adalah Sistem Informasi Manajemen Data Fungsional yang dirancang khusus untuk mengelola data Analis Kebijakan (AK) secara komprehensif dan terintegrasi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Siapa yang dapat menggunakan sistem ini?</h3>
              <p className="text-gray-600">
                Sistem ini dapat digunakan oleh admin instansi, user pegawai AK, dan pimpinan untuk mengelola dan memantau data fungsional.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Bagaimana cara mengakses sistem?</h3>
              <p className="text-gray-600">
                Anda dapat mengakses sistem melalui web browser dengan login menggunakan akun yang telah didaftarkan oleh admin instansi.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Apakah data aman di sistem ini?</h3>
              <p className="text-gray-600">
                Ya, sistem FUSION menggunakan enkripsi data dan sistem keamanan berlapis untuk melindungi informasi sensitif pegawai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="text-3xl font-bold">FUSION</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Sistem Informasi Manajemen Data Fungsional untuk kemajuan karir Analis Kebijakan di seluruh Indonesia.
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
