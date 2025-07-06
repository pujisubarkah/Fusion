'use client';
import React, { useEffect, useState } from "react";
import { FiBell, FiUser, FiLogOut, FiSettings, FiChevronDown } from "react-icons/fi";
import Link from "next/link";

export default function Header() {
  const [nama, setNama] = useState<string>("User");
  const [showDropdown, setShowDropdown] = useState(false);
  const [notificationCount] = useState(3);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    // Show confirmation
    if (!confirm("Apakah Anda yakin ingin logout?")) {
      return;
    }

    setIsLoggingOut(true);
    console.log("Starting logout process...");
    
    try {
      // Clear user data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("authToken");
        console.log("User data cleared from localStorage");
      }
      
      // Close dropdown
      setShowDropdown(false);
      
      console.log("Current pathname:", window.location.pathname);
      console.log("Redirecting to home page...");
      
      // Force redirect to home page
      window.location.href = "/";
      
    } catch (error) {
      console.error("Error during logout:", error);
      setIsLoggingOut(false);
      alert("Terjadi kesalahan saat logout. Silakan coba lagi.");
    }
  };

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
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm border-b border-gray-200 relative overflow-visible">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-96 h-full bg-gradient-to-r from-blue-50/30 to-transparent"></div>
      <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-blue-100/20 to-transparent"></div>
      
      {/* Left Section - Logo */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md hover:scale-105 transition-transform duration-300">
            <span className="text-xl font-black text-white">F</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black text-blue-600">
              FUSION
            </span>
            <span className="text-xs text-blue-500 font-medium -mt-1">Admin Panel</span>
          </div>
        </div>
        <div className="hidden md:block w-px h-8 bg-gray-300 mx-2"></div>
        <div className="hidden md:block">
          <p className="text-gray-600 text-sm font-medium">Fungsional Online System</p>
          <p className="text-gray-500 text-xs">Dashboard Management</p>
        </div>
      </div>
      {/* Right Section - Actions */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Notifications */}
        <div className="relative">
          <button className="group relative p-3 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#C2E7F6]/50 transition-all duration-300 hover:scale-105">
            <FiBell className="text-xl text-gray-600 group-hover:text-blue-700 transition-colors duration-300" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{notificationCount}</span>
              </div>
            )}
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-400 rounded-full animate-ping opacity-20"></div>
          </button>
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button 
            className="group flex items-center gap-3 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 hover:bg-[#C2E7F6]/50 transition-all duration-300 hover:scale-105"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <FiUser className="text-white text-sm" />
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-gray-800 font-semibold text-sm">{nama}</p>
              <p className="text-gray-600 text-xs">Administrator</p>
            </div>
            <FiChevronDown className={`text-gray-600 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white backdrop-blur-lg rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[200]">
              <div className="p-4 bg-[#C2E7F6]/30 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{nama}</p>
                <p className="text-sm text-gray-600">admin@fusion.com</p>
              </div>
              <div className="p-2">
                <button className="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors duration-200">
                    <FiUser className="text-blue-600 text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">Profile Settings</span>
                </button>
                <button className="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-purple-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-200">
                    <FiSettings className="text-purple-600 text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">System Settings</span>
                </button>
                {/* Test Home Link */}
                <Link href="/" className="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-green-50 transition-colors duration-200">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                    <span className="text-green-600 text-sm">🏠</span>
                  </div>
                  <span className="text-gray-700 font-medium">Test Home</span>
                </Link>
                <div className="border-t border-gray-200 my-2"></div>
                <button 
                  className="group w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200 disabled:opacity-50"
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-200">
                    <FiLogOut className="text-red-600 text-sm" />
                  </div>
                  <span className="text-gray-700 font-medium">
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showDropdown && (
        <div 
          className="fixed inset-0 z-[150]" 
          onClick={() => setShowDropdown(false)}
        ></div>
      )}
    </header>
  );
}
