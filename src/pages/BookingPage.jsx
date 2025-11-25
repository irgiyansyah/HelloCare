// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, CheckCircle } from 'lucide-react';
// 1. Import Context untuk akses Database
import { useHello } from '../context/HelloContext';

export default function BookingPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  
  // 2. Ambil fungsi addBooking dari Context
  const { addBooking } = useHello(); 

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState(''); // State baru untuk Nama Pasien
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state saat kirim data

  // Data Mock Jadwal (Bisa dibuat dinamis nanti, tapi statis dulu gpp untuk UI)
  const dates = [
    { day: 'Senin', date: '14 Okt', full: false },
    { day: 'Selasa', date: '15 Okt', full: false },
    { day: 'Rabu', date: '16 Okt', full: true },
    { day: 'Kamis', date: '17 Okt', full: false },
    { day: 'Jumat', date: '18 Okt', full: false },
  ];

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "13:00", "13:30", "14:00", "15:00"];
  const bookedSlots = ["10:00", "13:30"]; 

  // --- LOGIKA FULLSTACK ---
  const handleBooking = async () => {
    if (!patientName.trim()) return alert("Mohon isi nama pasien!");
    
    setIsSubmitting(true);

    // Kirim data ke Supabase via Context
    const success = await addBooking({
      patient: patientName,
      service: "Konsultasi Jantung", // Bisa disesuaikan
      doctor_id: id,
      date: selectedDate,
      time: selectedSlot
    });

    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/'); // Balik ke home setelah 2 detik
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Booking Berhasil!</h2>
          <p className="text-gray-600">Data Anda telah tersimpan di server.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-blue-600">
        <ChevronLeft size={20} /> Kembali
      </button>
      
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Pilih Jadwal Konsultasi</h1>
      <p className="text-gray-500 mb-8">Dokter ID: {id} | Spesialis Jantung</p>

      {/* INPUT NAMA PASIEN (WAJIB ADA) */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pasien</label>
        <input 
          type="text" 
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Masukkan nama lengkap pasien"
          className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
        />
      </div>

      {/* Pilih Tanggal */}
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Calendar size={18} /> Pilih Tanggal
      </h3>
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8">
        {dates.map((item, idx) => (
          <button
            key={idx}
            disabled={item.full}
            onClick={() => { setSelectedDate(item.date); setSelectedSlot(null); }}
            className={`min-w-[100px] p-4 rounded-2xl border-2 flex flex-col items-center gap-1 ${selectedDate === item.date ? 'border-blue-600 bg-blue-50 text-blue-600' : item.full ? 'bg-gray-100 text-gray-400' : 'border-gray-200'}`}
          >
            <span className="text-sm font-medium">{item.day}</span>
            <span className="text-lg font-bold">{item.date}</span>
          </button>
        ))}
      </div>

      {/* Pilih Jam */}
      {selectedDate && (
        <div className="animate-fade-in mb-24">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock size={18} /> Pilih Waktu
          </h3>
          <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
            {timeSlots.map((time, idx) => (
              <button
                key={idx}
                disabled={bookedSlots.includes(time)}
                onClick={() => setSelectedSlot(time)}
                className={`py-3 rounded-xl text-sm font-medium border ${selectedSlot === time ? 'bg-blue-600 text-white' : 'bg-white'}`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t shadow-lg">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Total Biaya</p>
            <p className="text-xl font-bold text-blue-600">Rp 150.000</p>
          </div>
          <button 
            disabled={!selectedDate || !selectedSlot || !patientName || isSubmitting}
            onClick={handleBooking}
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 disabled:bg-gray-300 transition-colors"
          >
            {isSubmitting ? 'Menyimpan...' : 'Konfirmasi Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}