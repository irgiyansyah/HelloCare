import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, ChevronLeft } from 'lucide-react';
import { supabase } from '../supabaseClient';

// Import Logo Kamu
import myLogo from '../assets/logo.png'; 

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // STEP 1: Minta OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Masukkan nomor telepon!");

    // Format nomor (+62)
    let formattedPhone = phoneNumber.replace(/\D/g, ''); 
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }
    if (!formattedPhone.startsWith('62')) {
        formattedPhone = '62' + formattedPhone;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+${formattedPhone}`,
      });

      if (error) throw error;

      setStep(2);
      alert("Kode OTP terkirim! (Gunakan kode Test Supabase)");
    } catch (error) {
      alert("Gagal: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // STEP 2: Verifikasi OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '62' + formattedPhone.slice(1);
    }
    if (!formattedPhone.startsWith('62')) {
        formattedPhone = '62' + formattedPhone;
    }

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `+${formattedPhone}`,
        token: otp,
        type: 'sms',
      });

      if (error) throw error;

      alert("Login Berhasil!");
      navigate('/'); 

    } catch (error) {
      alert("Kode OTP Salah: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      {/* Container Kartu Login */}
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 relative">
        
        {/* TOMBOL KEMBALI (Pojok Kiri Atas) */}
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-all"
          title="Kembali ke Beranda"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-8 mt-2">
          {/* LOGO CUSTOM */}
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
             <img 
               src={myLogo} 
               alt="HelloCare" 
               className="w-12 h-12 object-contain" 
             />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Selamat Datang' : 'Verifikasi OTP'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 px-6">
            {step === 1 
              ? 'Masuk atau daftar dengan nomor telepon Anda untuk memulai.' 
              : `Masukkan kode OTP yang dikirim ke ${phoneNumber}`
            }
          </p>
        </div>

        {/* FORM STEP 1: Input No HP */}
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-medium">+62</span>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 outline-none transition-all font-medium"
                  placeholder="812-3456-7890"
                  required
                />
              </div>
            </div>

            {/* BUTTON LOGIN */}
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-200 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Memproses...' : <>Kirim Kode OTP <ArrowRight size={18} /></>}
            </button>
          </form>
        )}

        {/* FORM STEP 2: Input OTP */}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <div className="flex justify-center gap-3">
                <input 
                  type="text" 
                  maxLength="6" 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)} 
                  className="w-full text-center text-3xl tracking-[0.3em] font-bold py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-50 outline-none transition-all text-gray-800" 
                  placeholder="000000" 
                  autoFocus
                />
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                Tidak menerima kode? <span className="text-teal-600 font-semibold cursor-pointer hover:underline">Kirim Ulang</span>
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-200"
            >
              {isLoading ? 'Memverifikasi...' : 'Masuk ke Akun'}
            </button>
            
            <button 
              type="button" 
              onClick={() => setStep(1)} 
              className="w-full text-gray-500 text-sm hover:text-gray-800 mt-2 font-medium"
            >
              Ganti Nomor Telepon
            </button>
          </form>
        )}
      </div>
    </div>
  );
}