import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { LogOut } from 'lucide-react'; 
import { useHello } from '../context/HelloContext';

import myLogo from '../assets/logo.png'; 

export default function Navbar() {
  const { user, logout, profile } = useHello();
  const navigate = useNavigate();

 const handleLogout = async () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin keluar?");

    if (isConfirmed) {
      // 1. Tunggu proses logout selesai 100%
      await logout(); 
      
      // 2. Navigasi manual ke Home (Lebih aman daripada reload paksa)
      // Gunakan navigate dari react-router-dom, JANGAN window.location.href
      navigate('/', { replace: true });
    }
  };

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-2">
        <img src={myLogo} alt="HelloCare Logo" className="w-10 h-10 rounded-lg object-contain" />
        <span className="text-xl font-bold text-teal-500">HelloCare</span>
      </Link>

      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/profile" className="group flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-all">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 group-hover:border-blue-400 transition-colors bg-gray-200">
              <img 
                src={profile?.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden md:block text-left pr-2">
              <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                Hi, {profile?.nickName || "User"}
              </p>
              <p className="text-xs text-gray-400">Pasien</p>
            </div>
          </Link>

          <div className="h-8 w-px bg-gray-200 mx-1 hidden md:block"></div>

          <button 
            type="button"
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
            title="Keluar"
          >
            <LogOut size={20} />
          </button>
        </div>
      ) : (
        <Link to="/login">
          <button className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors font-medium">
            Daftar / Masuk
          </button>
        </Link>
      )}
    </nav>
  );
}