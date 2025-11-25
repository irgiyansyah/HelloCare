// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* 1. Navbar: Selalu nempel di paling atas */}
      <Navbar />

      {/* 2. Main Content: Area dinamis yang isinya berubah sesuai halaman (Landing/Doctor/Events) */}
      {/* 'flex-grow' fungsinya mendorong Footer ke paling bawah */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 3. Footer: Selalu nempel di paling bawah */}
      <Footer />
    </div>
  );
}