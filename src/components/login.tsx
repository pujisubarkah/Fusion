"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { User, Lock, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Username dan password harus diisi");
      return;
    }

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
    }
  };

  return (
    <div className="flex h-screen m-0 p-0">
      <div className="w-1/4 flex flex-col justify-center items-center bg-white p-8">
        <div className="flex flex-col items-center mb-6">
          <Image src="/lanri.png" alt="Logo LANRI" className="w-28 mb-4" width={112} height={112} />
          <h1 className="text-6xl font-bold mb-2 text-[#003366] drop-shadow-[0_2px_0_#facc15,0_0px_2px_#facc15]">FUSION</h1>
          <p className="text-gray-600 text-center">
            Sistem Informasi Jabatan Fungsional Online
          </p>
        </div>
        <div className="w-full max-w-md">
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <div className="mb-4">
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                <input
                  className="shadow appearance-none border rounded w-full py-2 pl-10 pr-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-2.5 text-gray-500 cursor-pointer bg-transparent border-0 p-0"
                  tabIndex={-1}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            <div className="mb-6">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox text-[#3781c7]"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="ml-2 text-gray-700">Ingat saya?</span>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-[#003366] hover:bg-[#2d6ca1] text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline border-2 border-yellow-400 shadow-md"
                type="submit"
              >
                Masuk
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="w-3/4 bg-gray-100 flex items-center justify-center m-0 p-0 relative">
        <Image
          src="/dashboard.jpg"
          alt="Illustration of Lembaga Administrasi Negara building with cartoon characters"
          className="h-full object-cover"
          fill
        />
      </div>
    </div>
  );
};

export default Login;
