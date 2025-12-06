import React, { useState, useRef, useEffect } from 'react';
import { 
  Bell, User, Mail, ChevronDown, ArrowLeft, Save, Edit2, Camera, 
  Calendar, Clock, X, Phone, Globe, XCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHello } from '../context/HelloContext';

import myLogo from '../assets/logo.png'; 

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user, profile, updateProfile, bookings, rescheduleBooking } = useHello(); 
  
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState(profile || {});

  // State untuk Reschedule
  const [myBookings, setMyBookings] = useState([]);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);
  const [isRescheduling, setIsRescheduling] = useState(false);

  // Sync Data
  useEffect(() => {
    if (profile) setFormData(profile);
    if (user && bookings.length > 0) {
      const filtered = bookings.filter(b => b.userId === user.uid || b.patient_name === profile.fullName);
      setMyBookings(filtered);
    }
  }, [profile, user, bookings]);

  // Mock Data Jadwal
  const availableDates = [
    { day: 'Senin', date: '21 Okt' },
    { day: 'Selasa', date: '22 Okt' },
    { day: 'Rabu', date: '23 Okt' },
    { day: 'Kamis', date: '24 Okt' },
    { day: 'Jumat', date: '25 Okt' },
  ];
  const timeSlots = ["09:00", "10:00", "13:00", "14:00", "15:00"];

  // Handlers Input
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) return alert("Maksimal 5MB");
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, avatar: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (isEditing && fileInputRef.current) fileInputRef.current.click();
  };

  // --- LOGIKA SIMPAN & BATAL ---
  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateProfile(formData);
    setIsSaving(false);
    if (result.success) {
      alert("Profil berhasil disimpan!");
      setIsEditing(false);
    } else {
      alert("Gagal menyimpan: " + result.error);
    }
  };

  const handleCancel = () => {
    // Kembalikan data ke kondisi awal (profile asli)
    setFormData(profile); 
    setIsEditing(false);
  };

  // Handlers Reschedule
  const openReschedule = (booking) => {
    setSelectedBooking(booking);
    setNewDate(null);
    setNewTime(null);
    setShowRescheduleModal(true);
  };

  const submitReschedule = async () => {
    if (!newDate || !newTime) return alert("Pilih tanggal dan waktu baru!");
    setIsRescheduling(true);
    const success = await rescheduleBooking(selectedBooking.id, newDate, newTime);
    setIsRescheduling(false);
    if (success) {
      alert("Jadwal berhasil diubah!");
      setShowRescheduleModal(false);
    } else {
      alert("Gagal mengubah jadwal.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      
      {/* Modal Reschedule */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Atur Ulang Jadwal</h3>
              <button onClick={() => setShowRescheduleModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Layanan saat ini:</p>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="font-bold text-blue-900">{selectedBooking?.service}</p>
                <p className="text-sm text-blue-600">Jadwal Lama: {selectedBooking?.date} - {selectedBooking?.time}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-bold text-gray-700 block mb-2">Pilih Tanggal Baru</label>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {availableDates.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => setNewDate(item.date)}
                      className={`min-w-[70px] p-2 rounded-xl border text-center text-xs transition-all
                        ${newDate === item.date ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                      <span className="block opacity-70">{item.day}</span>
                      <span className="block font-bold text-sm">{item.date}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {newDate && (
                <div>
                  <label className="text-sm font-bold text-gray-700 block mb-2">Pilih Jam Baru</label>
                  <div className="grid grid-cols-4 gap-2">
                    {timeSlots.map((time, idx) => (
                      <button
                        key={idx}
                        onClick={() => setNewTime(time)}
                        className={`py-2 rounded-lg text-xs font-bold border transition-all
                          ${newTime === time ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button 
              onClick={submitReschedule}
              disabled={isRescheduling || !newDate || !newTime}
              className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
            >
              {isRescheduling ? 'Menyimpan...' : 'Konfirmasi Perubahan'}
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {formData.nickName || "User"}</h1>
              <p className="text-sm text-gray-400">Manage profile & schedules</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full"><Bell size={24} className="text-gray-600" /></button>
            <button className="p-2 hover:bg-gray-100 rounded-full"><User size={24} className="text-gray-900" /></button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-3 gap-8">
        
        {/* Kolom Kiri: Form Profil */}
        <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-lg border-2 border-gray-200 overflow-hidden">
            
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-12">
                <div className="flex items-center gap-3">
                <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                    <img src={myLogo} alt="HelloCare Logo" className="w-10 h-10 object-contain" />
                </div>
                <span className="text-3xl font-bold text-white tracking-wide">HelloCare</span>
                </div>
            </div>

            <div className="px-8 py-8">
                <div className="flex flex-col md:flex-row items-start justify-between mb-8 -mt-16 gap-4">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div 
                    onClick={triggerFileSelect}
                    className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative group ${isEditing ? 'cursor-pointer hover:opacity-90' : ''}`}
                    >
                    <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                    {isEditing && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                        <Camera size={24} /><span className="text-xs font-semibold mt-1">Ubah</span>
                        </div>
                    )}
                    <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </div>

                    <div className="mt-4 md:mt-16 text-center md:text-left">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.fullName || "Nama Lengkap"}</h2>
                    <p className="text-gray-600">{formData.email || "email@address.com"}</p>
                    </div>
                </div>
                
                {/* --- TOMBOL AKSI (EDIT / SIMPAN / BATAL) --- */}
                <div className="flex gap-2 mt-4 md:mt-16 justify-center md:justify-start">
                    {isEditing ? (
                        <>
                            {/* Tombol Simpan */}
                            <button 
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-green-600 text-white rounded-lg font-bold text-sm shadow-md hover:bg-green-700 flex items-center gap-2 transition-colors"
                            >
                                {isSaving ? "Menyimpan..." : <><Save size={16} /> Simpan</>}
                            </button>
                            
                            {/* Tombol Batal (Merah) */}
                            <button 
                                onClick={handleCancel}
                                disabled={isSaving}
                                className="px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-lg font-bold text-sm hover:bg-red-100 flex items-center gap-2 transition-colors"
                            >
                                <XCircle size={16} /> Batal
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                            <Edit2 size={18} /> Edit Profil
                        </button>
                    )}
                </div>
                {/* ------------------------------------------- */}

                </div>

                <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                    <input type="text" value={formData.fullName} onChange={(e) => handleInputChange('fullName', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500'}`} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Nick Name</label>
                    <input type="text" value={formData.nickName} onChange={(e) => handleInputChange('nickName', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500'}`} />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Gender</label>
                    <div className="relative">
                    <select value={formData.gender} onChange={(e) => handleInputChange('gender', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none appearance-none cursor-pointer ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'}`}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Country</label>
                    <div className="relative">
                    <select value={formData.country} onChange={(e) => handleInputChange('country', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none appearance-none cursor-pointer ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'}`}>
                        <option value="Indonesia">Indonesia</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Language</label>
                    <div className="relative">
                    <select value={formData.language} onChange={(e) => handleInputChange('language', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none appearance-none cursor-pointer ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'}`}>
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Time Zone</label>
                    <div className="relative">
                    <select value={formData.timeZone} onChange={(e) => handleInputChange('timeZone', e.target.value)} disabled={!isEditing} className={`w-full px-4 py-3 border rounded-lg focus:outline-none appearance-none cursor-pointer ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500 cursor-default'}`}>
                        <option value="wib">WIB (UTC+7)</option>
                        <option value="wita">WITA (UTC+8)</option>
                        <option value="wit">WIT (UTC+9)</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                    </div>
                </div>

                {/* NOMOR TELEPON (READ ONLY) */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                    <div className="flex gap-2">
                    <input type="text" value="+62" disabled className="w-20 px-4 py-3 bg-gray-200 border border-gray-200 rounded-lg text-gray-600 text-center font-medium cursor-not-allowed" />
                    <input 
                        type="text" 
                        value={formData.phone} 
                        disabled={true} 
                        className="flex-1 px-4 py-3 border rounded-lg focus:outline-none bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed"
                    />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">My Email Address</label>
                    <div className="space-y-3">
                    <div className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${isEditing ? 'bg-white border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0"><Mail size={20} className="text-white" /></div>
                        <div className="flex-1 overflow-hidden">
                        {isEditing ? (
                            <input type="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} className="w-full font-semibold text-gray-900 bg-transparent border-b border-blue-200 focus:border-blue-500 outline-none pb-1" />
                        ) : (
                            <p className="font-semibold text-gray-900 truncate">{formData.email}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">Primary Email</p>
                        </div>
                    </div>
                    {isEditing && (
                        <button className="text-blue-600 font-semibold hover:underline text-sm transition-colors">+ Add Another Email</button>
                    )}
                    </div>
                </div>

                </div>
            </div>
            </div>
        </div>

        {/* Kolom Kanan: Jadwal */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><Calendar size={20} className="text-blue-600" /> Janji Temu Saya</h3>
            {myBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>Belum ada jadwal.</p>
                <button onClick={() => navigate('/')} className="mt-2 text-blue-600 text-sm font-semibold hover:underline">Buat Janji Baru</button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow bg-gray-50">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : booking.status === 'Rescheduled' ? 'bg-purple-100 text-purple-700' : booking.status === 'Cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{booking.status}</span>
                      <span className="text-xs text-gray-400">{booking.time}</span>
                    </div>
                    <h4 className="font-bold text-gray-800 text-sm mb-1">{booking.service}</h4>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1"><Calendar size={12} /> {booking.date}</p>
                    {booking.status !== 'Cancelled' && (
                      <button onClick={() => openReschedule(booking)} className="w-full py-2 bg-white border border-blue-200 text-blue-600 text-xs font-bold rounded-lg hover:bg-blue-50 transition-colors">Reschedule / Ubah</button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}