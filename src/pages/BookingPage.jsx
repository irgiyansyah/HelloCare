import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, CheckCircle, CreditCard, Wallet, Building } from 'lucide-react';
// 1. Import Context
import { useHello } from '../context/HelloContext';

export default function BookingPage() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const { addBooking } = useHello(); 

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientName, setPatientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(''); // State untuk Pembayaran
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const price = 150000; // Harga Konsultasi

  // Data Mock Jadwal
  const dates = [
    { day: 'Senin', date: '14 Okt', full: false },
    { day: 'Selasa', date: '15 Okt', full: false },
    { day: 'Rabu', date: '16 Okt', full: true },
    { day: 'Kamis', date: '17 Okt', full: false },
    { day: 'Jumat', date: '18 Okt', full: false },
  ];

  const timeSlots = ["09:00", "09:30", "10:00", "10:30", "13:00", "13:30", "14:00", "15:00"];
  const bookedSlots = ["10:00", "13:30"]; 

  // OPSI PEMBAYARAN
  const paymentOptions = [
    { id: 'dana', name: 'DANA', icon: <Wallet size={20} />, color: 'text-blue-500 bg-blue-50' },
    { id: 'gopay', name: 'GoPay', icon: <Wallet size={20} />, color: 'text-green-500 bg-green-50' },
    { id: 'ovo', name: 'OVO', icon: <Wallet size={20} />, color: 'text-purple-500 bg-purple-50' },
    { id: 'transfer', name: 'Transfer Bank', icon: <Building size={20} />, color: 'text-gray-700 bg-gray-100' },
    { id: 'cash', name: 'Bayar di Klinik', icon: <CreditCard size={20} />, color: 'text-teal-600 bg-teal-50' },
  ];

  const handleBooking = async () => {
    if (!patientName.trim()) return alert("Mohon isi nama pasien!");
    if (!selectedDate || !selectedSlot) return alert("Pilih tanggal dan waktu dulu!");
    if (!paymentMethod) return alert("Pilih metode pembayaran!");
    
    setIsSubmitting(true);

    // Kirim data ke Firebase via Context
    const success = await addBooking({
      patient: patientName,
      service: "Konsultasi Dokter", 
      doctor_id: id,
      date: selectedDate,
      time: selectedSlot,
      paymentMethod: paymentMethod, // Simpan metode pembayaran
      price: price
    });

    setIsSubmitting(false);

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-green-100 max-w-sm mx-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
             <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Berhasil!</h2>
          <p className="text-gray-600 mb-6">Pembayaran via <span className="font-bold capitalize">{paymentMethod}</span> akan diproses.</p>
          <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
             <div className="bg-green-500 h-full w-full animate-[width_2s_ease-in-out]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-32"> {/* Padding bottom biar gak ketutup footer fixed */}
      <div className="max-w-3xl mx-auto px-6 py-8">
        
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-6 hover:text-blue-600 font-medium">
          <ChevronLeft size={20} /> Kembali
        </button>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Konfirmasi Jadwal</h1>
        <p className="text-gray-500 mb-8">Dokter ID: {id} | Sesi Konsultasi Standar</p>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 space-y-8">
            
            {/* 1. INPUT NAMA PASIEN */}
            <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Nama Pasien</label>
                <input 
                  type="text" 
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Siapa yang akan diperiksa?"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50 focus:bg-white"
                />
            </div>

            {/* 2. PILIH TANGGAL */}
            <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-600" /> Pilih Tanggal
                </h3>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {dates.map((item, idx) => (
                    <button
                        key={idx}
                        disabled={item.full}
                        onClick={() => { setSelectedDate(item.date); setSelectedSlot(null); }}
                        className={`min-w-[90px] p-3 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all
                        ${selectedDate === item.date 
                            ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' 
                            : item.full 
                            ? 'bg-gray-100 text-gray-400 border-transparent cursor-not-allowed' 
                            : 'border-gray-100 hover:border-blue-200'}`}
                    >
                        <span className="text-xs font-medium">{item.day}</span>
                        <span className="text-lg font-bold">{item.date}</span>
                    </button>
                    ))}
                </div>
            </div>

            {/* 3. PILIH WAKTU */}
            {selectedDate && (
                <div className="animate-fade-in">
                    <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <Clock size={18} className="text-blue-600" /> Pilih Waktu
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {timeSlots.map((time, idx) => (
                        <button
                            key={idx}
                            disabled={bookedSlots.includes(time)}
                            onClick={() => setSelectedSlot(time)}
                            className={`py-3 rounded-xl text-sm font-medium border transition-all
                            ${selectedSlot === time 
                                ? 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105' 
                                : bookedSlots.includes(time)
                                ? 'bg-gray-100 text-gray-300 border-transparent cursor-not-allowed decoration-slice'
                                : 'bg-white border-gray-200 hover:border-blue-300 text-gray-600'}`}
                        >
                            {time}
                        </button>
                        ))}
                    </div>
                </div>
            )}

            {/* 4. METODE PEMBAYARAN (BARU) */}
            <div className="pt-4 border-t border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <CreditCard size={18} className="text-blue-600" /> Metode Pembayaran
                </h3>
                <div className="space-y-3">
                    {paymentOptions.map((method) => (
                        <div 
                            key={method.id}
                            onClick={() => setPaymentMethod(method.id)}
                            className={`flex items-center justify-between p-4 rounded-xl bordercursor-pointer transition-all cursor-pointer border-2
                                ${paymentMethod === method.id 
                                    ? 'border-blue-500 bg-blue-50/50' 
                                    : 'border-gray-100 hover:border-gray-200'}`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${method.color}`}>
                                    {method.icon}
                                </div>
                                <span className="font-semibold text-gray-700">{method.name}</span>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                                ${paymentMethod === method.id ? 'border-blue-500' : 'border-gray-300'}`}>
                                {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full"></div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </div>

      {/* Footer Action Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-6 border-t border-gray-100 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Biaya</p>
            <p className="text-2xl font-bold text-blue-600">
                Rp {price.toLocaleString('id-ID')}
            </p>
          </div>
          <button 
            disabled={!selectedDate || !selectedSlot || !patientName || !paymentMethod || isSubmitting}
            onClick={handleBooking}
            className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-blue-200"
          >
            {isSubmitting ? 'Memproses...' : 'Bayar & Konfirmasi'}
          </button>
        </div>
      </div>
    </div>
  );
}