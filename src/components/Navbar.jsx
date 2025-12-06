import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { LogOut, Menu, X, User } from 'lucide-react'; // Tambah icon Menu & X untuk HP
import { useHello } from '../context/HelloContext';

import myLogo from '../assets/logo.png'; 

export default function Navbar() {
  const { user, logout, profile } = useHello();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    const isConfirmed = window.confirm("Apakah Anda yakin ingin keluar?");
    if (isConfirmed) {
      await logout(); 
      navigate('/', { replace: true });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* 1. LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src={myLogo} alt="HelloCare Logo" className="w-10 h-10 rounded-lg object-contain" />
          <span className="text-xl font-bold text-teal-500">HelloCare</span>
        </Link>

        {/* 2. MENU DESKTOP (Layar Besar) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              
              {/* LINK KE PROFIL (PASTIKAN INI /profile) */}
              <Link 
                to="/profile" 
                className="group flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-50 transition-all"
                title="Lihat Profil Saya"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-100 group-hover:border-blue-400 transition-colors bg-gray-200">
                  <img 
                    src={profile?.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left pr-2">
                  <p className="text-sm font-bold text-gray-700 group-hover:text-blue-600 transition-colors">
                    Hi, {profile?.nickName || "User"}
                  </p>
                  <p className="text-xs text-gray-400">Pasien</p>
                </div>
              </Link>

              <div className="h-8 w-px bg-gray-200 mx-1"></div>

              <button 
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
        </div>

        {/* 3. TOMBOL HAMBURGER (HP Only) */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* 4. MENU MOBILE (Dropdown HP) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {user ? (
            <>
              {/* Link Profil Mobile */}
              <Link 
                to="/profile" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-100"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border border-blue-200">
                   <img src={profile?.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                   <p className="font-bold text-gray-900">{profile?.fullName || "User"}</p>
                   <p className="text-xs text-blue-600">Lihat Profil</p>
                </div>
              </Link>

              <Link 
                to="/events"
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 text-gray-700 font-medium hover:bg-gray-50 rounded-xl"
              >
                Jadwal Event
              </Link>

              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 p-3 text-red-600 font-medium hover:bg-red-50 rounded-xl"
              >
                <LogOut size={20} /> Keluar
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold">
                Masuk Sekarang
              </button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}