"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, Eye, EyeOff, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Slider images data
  const slides = [
    {
      image: "/LAN_9694.JPG",
      title: "Gedung LANRI",
      subtitle: "Lembaga Administrasi Negara Republik Indonesia",
      description: "Pusat pengembangan aparatur sipil negara yang profesional dan berintegritas"
    },
    {
      image: "/LAN_9802.JPG",
      title: "Fasilitas Modern",
      subtitle: "Infrastruktur pendidikan dan pelatihan terdepan",
      description: "Dilengkapi teknologi canggih untuk pembelajaran yang efektif"
    },
    {
      image: "/LAN_9736.JPG",
      title: "Lingkungan Akademis",
      subtitle: "Suasana kondusif untuk pengembangan kompetensi",
      description: "Menciptakan lingkungan belajar yang inspiratif dan inovatif"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username dan password harus diisi");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.error || "Terjadi kesalahan saat login");
        return;
      }

      const { user, session_id } = result;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("session_id", session_id);

      if (user.role_id === 1) {
        router.push("/admin/home");
      } else if (user.role_id === 2) {
        router.push("/user/home");
      } else {
        setErrorMessage("Peran tidak dikenali");
      }
    } catch (err) {
      console.error("Error saat login:", err);
      setErrorMessage("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen m-0 p-0 overflow-hidden">
      {/* Left Panel - Login Form */}
      <div className="w-1/2 xl:w-2/5 relative bg-gray-50 flex flex-col justify-center items-center p-8 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-white"></div>
        
        <div className="relative z-10 w-full max-w-md">
          {/* Logo and Title Section */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="relative group mb-6">
              <Image 
                src="/lanri.png" 
                alt="Logo LANRI" 
                className="relative w-28 h-28 rounded-lg shadow-sm transform hover:scale-105 transition-all duration-300 border border-gray-200" 
                width={112} 
                height={112} 
              />
            </div>
            
            <div className="mb-4">
              <h1 className="text-6xl xl:text-7xl font-black mb-2 text-blue-600 relative">
                FUSION
              </h1>
              <div className="h-1 w-32 bg-blue-600 rounded-full mx-auto"></div>
            </div>
            
            <p className="text-gray-600 text-lg font-medium leading-relaxed">
              Sistem Informasi Jabatan<br />
              <span className="text-blue-600 font-semibold">Fungsional Online</span>
            </p>
          </div>

          {/* Login Form */}
          <div className="relative">
            <form onSubmit={handleLogin} className="relative bg-white rounded-lg p-8 shadow-sm border border-gray-200 space-y-6">
              {/* Welcome Text */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Selamat Datang! 👋</h2>
                <p className="text-gray-600">Silakan masuk ke akun Anda</p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    {errorMessage}
                  </div>
                </div>
              )}

              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Username</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <input
                    className="w-full py-4 pl-12 pr-4 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium placeholder:text-gray-400 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:border-gray-400 transition-all duration-300"
                    id="username"
                    type="text"
                    placeholder="Masukkan username Anda"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  <input
                    className="w-full py-4 pl-12 pr-12 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium placeholder:text-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:border-gray-400 transition-all duration-300"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password Anda"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-white border-2 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-blue-600 transition-colors">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  Lupa password?
                </a>
              </div>

              {/* Login Button */}
              <button
                className={`
                  w-full py-4 px-6 rounded-lg font-bold text-lg shadow-sm transition-all duration-300 
                  flex items-center justify-center gap-3 group relative overflow-hidden
                  ${isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 hover:shadow-md'
                  }
                  text-white
                `}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Memproses...
                  </>
                ) : (
                  <>
                    Masuk
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              {/* Footer Text */}
              <div className="text-center pt-4">
                <p className="text-sm text-gray-500">
                  Belum punya akun? 
                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline ml-1 font-semibold">
                    Hubungi Administrator
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Image Slider */}
      <div className="w-1/2 xl:w-3/5 relative bg-blue-600 flex items-center justify-center overflow-hidden">
        {/* Slider Container */}
        <div className="relative w-full h-full">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-full transform transition-transform duration-1000"
                fill
                priority={index === 0}
              />
              
              {/* Dynamic overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/50 to-indigo-900/70"></div>
              
              {/* Animated particles */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-700"></div>
                <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse delay-300"></div>
              </div>
              
              {/* Slide Content with animations */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                <div className={`max-w-lg transform transition-all duration-1000 delay-300 ${
                  index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                }`}>
                  <h2 className="text-4xl xl:text-5xl font-bold text-white mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-xl text-white/90 mb-6 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <p className="text-white/80 text-lg leading-relaxed drop-shadow-sm">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-110' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20">
            <div 
              className="h-full bg-gradient-to-r from-white via-blue-200 to-white transition-all duration-300 ease-linear relative overflow-hidden"
              style={{ 
                width: `${((currentSlide + 1) / slides.length) * 100}%` 
              }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
