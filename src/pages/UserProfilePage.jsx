import React, { useState, useRef, useEffect } from 'react';
import { Bell, User, Mail, ChevronDown, ArrowLeft, Save, Edit2, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useHello } from '../context/HelloContext';

import myLogo from '../assets/logo.png'; 

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useHello(); 
  
  const fileInputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false); // Loading state

  const [formData, setFormData] = useState(profile);

  // Sinkronisasi data dari Database ke Form
  useEffect(() => {
    if (profile) {
      setFormData(profile);
    }
  }, [profile]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Convert Gambar ke Base64 agar bisa disimpan di database text
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2000000) { // Batas 2MB
        alert("Ukuran gambar terlalu besar! Maksimal 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    if (isEditing && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // Simpan ke Supabase
      setIsSaving(true);
      await updateProfile(formData);
      setIsSaving(false);
      alert("Data profil berhasil disimpan ke Database!");
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-gray-600" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {formData.nickName}</h1>
              <p className="text-sm text-gray-400">Wed, 01 Oct 2025</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Bell size={24} className="text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User size={24} className="text-gray-900" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
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
                
                {/* FOTO PROFIL */}
                <div 
                  onClick={triggerFileSelect}
                  className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white relative group 
                    ${isEditing ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
                >
                  <img 
                    src={formData.avatar} 
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  {isEditing && (
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white">
                      <Camera size={24} />
                      <span className="text-xs font-semibold mt-1">Ubah</span>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                </div>

                <div className="mt-4 md:mt-16 text-center md:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">{formData.fullName || "Nama Lengkap"}</h2>
                  <p className="text-gray-600">{formData.email || "email@address.com"}</p>
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 md:mt-16 justify-center md:justify-start">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md">
                  Detail Schedule
                </button>
                
                <button 
                  onClick={handleEditToggle}
                  disabled={isSaving}
                  className={`px-6 py-3 border rounded-lg font-semibold transition-all flex items-center gap-2
                    ${isEditing 
                      ? 'bg-green-600 text-white border-green-600 hover:bg-green-700' 
                      : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                >
                  {isSaving ? (
                    "Menyimpan..."
                  ) : isEditing ? (
                    <><Save size={18} /> Simpan</>
                  ) : (
                    <><Edit2 size={18} /> Edit</>
                  )}
                </button>
              </div>
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

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone</label>
                <div className="flex gap-2">
                  <input type="text" value="+62" disabled className="w-20 px-4 py-3 bg-gray-200 border border-gray-200 rounded-lg text-gray-600 text-center font-medium" />
                  <input type="text" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} disabled={!isEditing} className={`flex-1 px-4 py-3 border rounded-lg focus:outline-none ${isEditing ? 'bg-white border-blue-300 focus:border-blue-600' : 'bg-gray-50 border-gray-200 text-gray-500'}`} />
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
    </div>
  );
}