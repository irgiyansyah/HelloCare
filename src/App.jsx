import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';

// Import Halaman
import LandingPage from './pages/LandingPage';
import DoctorDetailPage from './pages/DoctorDetailPage';
import EventsPage from './pages/EventsPage';
import LoginPage from './pages/LoginPage'; 
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import UserProfilePage from './pages/UserProfilePage'; // 1. Import Profile

function App() {
  return (
    <Routes>
      {/* Halaman yang berdiri sendiri */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminDashboard />} /> 

      {/* Halaman User dengan Navbar & Footer */}
      <Route path="/" element={<Layout />}>
        
        <Route index element={<LandingPage />} />
        
        <Route path="doctor/:id" element={<DoctorDetailPage />} />
        
        <Route path="booking/:id" element={<BookingPage />} /> 
        
        <Route path="events" element={<EventsPage />} />
        
        {/* 2. Route Profil */}
        <Route path="profile" element={<UserProfilePage />} />

      </Route>
    </Routes>
  );
}

export default App;