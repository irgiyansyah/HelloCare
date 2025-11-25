// src/pages/DoctorDetailPage.jsx
import React, { useState } from 'react';
// 1. PENTING: Import useNavigate agar bisa pindah halaman
import { useNavigate, useParams } from 'react-router-dom'; 
import { ArrowLeft, MapPin, Calendar, Phone, MessageCircle, Star, Smile, ThumbsUp, Heart } from 'lucide-react';

export default function DoctorDetailPage() {
  // 2. PENTING: Aktifkan fungsi navigasi
  const navigate = useNavigate(); 
  const { id } = useParams(); // Ambil ID dari URL (misal: 1)

  const [showFullAbout, setShowFullAbout] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Tombol Back */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Kita ubah tombol Back biar berfungsi juga */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Doctor Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg sticky top-24">
              
              {/* Foto Dokter */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto bg-white rounded-full overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop" 
                    alt="Dr Y K Mishra"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 bg-blue-600 text-white px-4 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} className="fill-white" />
                  <span>4.5</span>
                </div>
              </div>

              {/* Contact Icons */}
              <div className="flex justify-center gap-4 mb-6 mt-8">
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <Calendar size={20} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <Phone size={20} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <MessageCircle size={20} className="text-blue-600" />
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">Rp 150.000</div>
                <div className="text-sm text-gray-600">Online / Offline</div>
              </div>

              {/* === TOMBOL YANG TADI GAK BISA === */}
              {/* 3. PENTING: Tambahkan onClick di sini */}
              <button 
                onClick={() => navigate(`/booking/${id || 1}`)}
                className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors mb-6 shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
              >
                Book Appointment
              </button>
              {/* ================================= */}

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 text-gray-700">
                  <Smile size={16} className="text-blue-600" /> Friendly
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 text-gray-700">
                  <ThumbsUp size={16} className="text-blue-600" /> Good Listener
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Info */}
          <div className="lg:col-span-2">
            {/* Doctor Name & Title */}
            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6 border border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Dr Y K Mishra</h1>
              <p className="text-xl text-gray-500 mb-6">Cardiac Surgeon</p>
              <div className="flex items-center gap-2 text-gray-700 mb-6">
                <MapPin size={20} className="text-gray-500" />
                <span className="font-medium">Jakarta, Indonesia</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Dr. Mishra adalah spesialis jantung berpengalaman dengan lebih dari 15 tahun pengalaman dalam menangani berbagai kasus kardiovaskular kompleks.
              </p>
            </div>

            {/* Specialities */}
            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Keahlian</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium">
                  Operasi Jantung
                </span>
                <span className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium">
                  Transplantasi
                </span>
                <span className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-medium">
                  Konsultasi
                </span>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Dokter</h2>
              <div className={`text-gray-600 leading-relaxed ${!showFullAbout && 'line-clamp-4'}`}>
                <p className="mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim lorem sit rhoncus ullamcorper. Dui lorem duis amet vulputate. Nunc lobortis adipiscing faucibus diam amet sed.
                </p>
                <p>
                  At suscipit suscipit magna est neque aliquam facilisis eu. Nisi, nullam et in ipsum, mi dignissim nec. Nibh nullam libero nibh suscipit montes, fringilla donec quis.
                </p>
              </div>
              <button 
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-blue-600 font-semibold mt-4 hover:underline"
              >
                {showFullAbout ? 'Lebih Sedikit' : 'Baca Selengkapnya'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}