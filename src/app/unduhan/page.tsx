"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft, FiDownload, FiFile, FiCalendar, FiHardDrive, FiLayers, FiSearch, FiFilter, FiEye, FiUsers, FiX } from 'react-icons/fi';

interface PDFFile {
  id: number;
  title: string;
  category: string;
  description: string;
  fileName: string;
  fileSize: string;
  fileCount: number;
  createDate: string;
  lastModified: string;
  downloadUrl: string;
  tags: string[];
  color: string;
  bgColor: string;
}

export default function UnduhanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pdfFiles: PDFFile[] = [
    {
      id: 1,
      title: "Peraturan Pemerintah No. 11 Tahun 2017",
      category: "Peraturan Pemerintah",
      description: "Tentang Manajemen Pegawai Negeri Sipil dan ketentuan pelaksanaan jabatan fungsional Analis Kebijakan",
      fileName: "PP_11_2017_Manajemen_PNS.pdf",
      fileSize: "2.4 MB",
      fileCount: 1,
      createDate: "15 Maret 2017",
      lastModified: "22 Januari 2024",
      downloadUrl: "/downloads/pp-11-2017.pdf",
      tags: ["PNS", "Manajemen", "Jabatan Fungsional"],
      color: "from-blue-600 to-blue-800",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      id: 2,
      title: "Permenpan RB No. 45 Tahun 2013",
      category: "Peraturan Menteri",
      description: "Jabatan Fungsional Analis Kebijakan dan Angka Kreditnya - Pedoman lengkap untuk pengembangan karir AK",
      fileName: "Permenpan_RB_45_2013_JF_Analis_Kebijakan.pdf",
      fileSize: "1.8 MB",
      fileCount: 1,
      createDate: "28 November 2013",
      lastModified: "10 Desember 2023",
      downloadUrl: "/downloads/permenpan-45-2013.pdf",
      tags: ["Analis Kebijakan", "Angka Kredit", "JF"],
      color: "from-green-600 to-green-800",
      bgColor: "from-green-50 to-green-100"
    },
    {
      id: 3,
      title: "Peraturan BKN No. 12 Tahun 2020",
      category: "Peraturan BKN",
      description: "Petunjuk Teknis Pelaksanaan Penilaian Angka Kredit Jabatan Fungsional Analis Kebijakan",
      fileName: "Peraturan_BKN_12_2020_Juknis_AK.pdf",
      fileSize: "3.2 MB",
      fileCount: 1,
      createDate: "18 Juni 2020",
      lastModified: "05 Februari 2024",
      downloadUrl: "/downloads/bkn-12-2020.pdf",
      tags: ["BKN", "Juknis", "Penilaian"],
      color: "from-purple-600 to-purple-800",
      bgColor: "from-purple-50 to-purple-100"
    },
    {
      id: 4,
      title: "Panduan DUPAK Analis Kebijakan",
      category: "Panduan",
      description: "Daftar Usulan Penetapan Angka Kredit untuk Jabatan Fungsional Analis Kebijakan - Template dan contoh",
      fileName: "Panduan_DUPAK_Analis_Kebijakan_2024.pdf",
      fileSize: "4.1 MB",
      fileCount: 3,
      createDate: "12 Januari 2024",
      lastModified: "28 Februari 2024",
      downloadUrl: "/downloads/panduan-dupak-2024.pdf",
      tags: ["DUPAK", "Template", "Contoh"],
      color: "from-orange-600 to-orange-800",
      bgColor: "from-orange-50 to-orange-100"
    },
    {
      id: 5,
      title: "Standar Kompetensi Analis Kebijakan",
      category: "Standar Kompetensi",
      description: "Kompetensi teknis, manajerial, dan sosio-kultural yang harus dimiliki oleh Analis Kebijakan",
      fileName: "Standar_Kompetensi_AK_2023.pdf",
      fileSize: "2.9 MB",
      fileCount: 1,
      createDate: "08 Agustus 2023",
      lastModified: "15 November 2023",
      downloadUrl: "/downloads/standar-kompetensi-ak.pdf",
      tags: ["Kompetensi", "Standar", "Teknis"],
      color: "from-red-600 to-red-800",
      bgColor: "from-red-50 to-red-100"
    },
    {
      id: 6,
      title: "Kumpulan Peraturan Terkait JF-AK",
      category: "Kompilasi",
      description: "Kumpulan lengkap peraturan perundang-undangan yang berkaitan dengan Jabatan Fungsional Analis Kebijakan",
      fileName: "Kompilasi_Peraturan_JF_AK_2024.pdf",
      fileSize: "8.7 MB",
      fileCount: 15,
      createDate: "03 Maret 2024",
      lastModified: "20 Maret 2024",
      downloadUrl: "/downloads/kompilasi-peraturan-ak.pdf",
      tags: ["Kompilasi", "Lengkap", "Perundangan"],
      color: "from-indigo-600 to-indigo-800",
      bgColor: "from-indigo-50 to-indigo-100"
    }
  ];

  const categories = ['Semua', ...Array.from(new Set(pdfFiles.map(file => file.category)))];

  const filteredFiles = pdfFiles.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === '' || selectedCategory === 'Semua' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleFileClick = (file: PDFFile) => {
    setSelectedFile(file);
    setIsModalOpen(true);
  };

  const handleDownload = (file: PDFFile) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = file.downloadUrl;
    link.download = file.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFile(null);
  };

  const getAvatarColor = (category: string) => {
    switch (category) {
      case 'Peraturan Pemerintah':
        return { bg: 'bg-blue-500', hoverBg: 'hover:bg-blue-600', border: 'border-blue-300' };
      case 'Peraturan Menteri':
        return { bg: 'bg-green-500', hoverBg: 'hover:bg-green-600', border: 'border-green-300' };
      case 'Peraturan BKN':
        return { bg: 'bg-purple-500', hoverBg: 'hover:bg-purple-600', border: 'border-purple-300' };
      case 'Panduan':
        return { bg: 'bg-orange-500', hoverBg: 'hover:bg-orange-600', border: 'border-orange-300' };
      case 'Standar Kompetensi':
        return { bg: 'bg-red-500', hoverBg: 'hover:bg-red-600', border: 'border-red-300' };
      case 'Kompilasi':
        return { bg: 'bg-indigo-500', hoverBg: 'hover:bg-indigo-600', border: 'border-indigo-300' };
      default:
        return { bg: 'bg-gray-500', hoverBg: 'hover:bg-gray-600', border: 'border-gray-300' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Back to Home */}
            <Link href="/" className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors">
              <FiArrowLeft className="text-xl" />
              <span className="font-medium">Kembali ke Beranda</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-300">
                <FiUsers className="text-white text-xl" />
              </div>
              <span className="text-2xl font-bold text-blue-600">
                FUSION
              </span>
            </div>

            {/* Login Button */}
            <Link
              href="/login"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
            >
              Masuk
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FiDownload className="text-4xl text-blue-600" />
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
              Pusat{' '}
              <span className="text-blue-600">
                Unduhan
              </span>
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Download peraturan, panduan, dan dokumentasi resmi terkait Jabatan Fungsional Analis Kebijakan 
            dalam format PDF yang mudah diakses dan dipelajari.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  placeholder="Cari peraturan, panduan, atau kata kunci..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white appearance-none min-w-[200px]"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'Semua' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              Ditemukan <span className="font-bold text-blue-600">{filteredFiles.length}</span> file
            </div>
          </div>
        </div>
      </section>

      {/* Files Grid */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFiles.map((file) => {
              const avatarColor = getAvatarColor(file.category);
              return (
              <div
                key={file.id}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 group cursor-pointer border border-gray-200"
                onClick={() => handleFileClick(file)}
              >
                {/* File Icon */}
                <div className={`w-16 h-16 ${avatarColor.bg} group-${avatarColor.hoverBg} rounded-lg flex flex-col items-center justify-center mb-4 transition-colors duration-300 ${avatarColor.border} relative shadow-md`}>
                  <FiFile className="text-white text-lg mb-1" />
                  <span className="text-white text-xs font-bold">PDF</span>
                  {/* Small corner fold effect */}
                  <div className="absolute top-0 right-0 w-3 h-3 bg-white bg-opacity-20 transform rotate-45 translate-x-1 -translate-y-1"></div>
                </div>

                {/* Category Badge */}
                <div className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full mb-3">
                  {file.category}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {file.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {file.description}
                </p>

                {/* File Info */}
                <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <FiHardDrive className="text-sm" />
                    {file.fileSize}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiLayers className="text-sm" />
                    {file.fileCount} file{file.fileCount > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {file.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFileClick(file);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-blue-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    <FiEye className="text-sm" />
                    Detail
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(file);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300"
                  >
                    <FiDownload className="text-sm" />
                    Download
                  </button>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* File Detail Modal */}
      {isModalOpen && selectedFile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl relative border border-gray-200 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 bg-gray-100 hover:bg-red-50 rounded-full p-2 transition-colors duration-300"
            >
              <FiX size={20} />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              {(() => {
                const avatarColor = getAvatarColor(selectedFile.category);
                return (
                  <div className={`w-20 h-20 ${avatarColor.bg} rounded-lg flex flex-col items-center justify-center mx-auto mb-4 ${avatarColor.border} shadow-lg relative`}>
                    <FiFile className="text-white text-2xl mb-1" />
                    <span className="text-white text-sm font-bold">PDF</span>
                    {/* Small corner fold effect */}
                    <div className="absolute top-0 right-0 w-4 h-4 bg-white bg-opacity-20 transform rotate-45 translate-x-2 -translate-y-2"></div>
                  </div>
                );
              })()}
              <div className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full mb-4">
                {selectedFile.category}
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {selectedFile.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {selectedFile.description}
              </p>
            </div>

            {/* File Metadata */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FiFile className="text-blue-600 text-lg" />
                    <span className="font-semibold text-gray-800">Nama File</span>
                  </div>
                  <p className="text-gray-600 text-sm font-mono bg-white px-3 py-2 rounded-lg">
                    {selectedFile.fileName}
                  </p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FiHardDrive className="text-green-600 text-lg" />
                    <span className="font-semibold text-gray-800">Ukuran File</span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {selectedFile.fileSize}
                  </p>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FiLayers className="text-purple-600 text-lg" />
                    <span className="font-semibold text-gray-800">Jumlah File</span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {selectedFile.fileCount} dokumen
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCalendar className="text-orange-600 text-lg" />
                    <span className="font-semibold text-gray-800">Tanggal Dibuat</span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {selectedFile.createDate}
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <FiCalendar className="text-red-600 text-lg" />
                    <span className="font-semibold text-gray-800">Terakhir Diperbarui</span>
                  </div>
                  <p className="text-gray-600 font-medium">
                    {selectedFile.lastModified}
                  </p>
                </div>

                <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-semibold text-gray-800">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedFile.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white text-indigo-600 text-sm font-medium rounded-full border border-indigo-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Download Button */}
            <div className="text-center">
              <button
                onClick={() => handleDownload(selectedFile)}
                className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                <FiDownload className="text-xl" />
                Download File
                <span className="text-sm opacity-90">({selectedFile.fileSize})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Statistik Unduhan</h2>
            <p className="text-xl text-gray-600">Koleksi peraturan dan panduan untuk Analis Kebijakan</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-blue-50 p-8 rounded-lg border border-blue-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-blue-600 mb-2">{pdfFiles.length}</div>
              <div className="text-gray-600 font-medium">Total Dokumen</div>
            </div>
            
            <div className="text-center bg-green-50 p-8 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-green-600 mb-2">{categories.length - 1}</div>
              <div className="text-gray-600 font-medium">Kategori</div>
            </div>
            
            <div className="text-center bg-purple-50 p-8 rounded-lg border border-purple-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {pdfFiles.reduce((sum, file) => sum + file.fileCount, 0)}
              </div>
              <div className="text-gray-600 font-medium">Total File</div>
            </div>
            
            <div className="text-center bg-orange-50 p-8 rounded-lg border border-orange-200 hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl font-bold text-orange-600 mb-2">2024</div>
              <div className="text-gray-600 font-medium">Update Terbaru</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center border border-blue-300">
                <FiUsers className="text-white text-2xl" />
              </div>
              <span className="text-3xl font-bold">FUSION</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
              Pusat unduhan resmi untuk peraturan dan panduan Jabatan Fungsional Analis Kebijakan.
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
