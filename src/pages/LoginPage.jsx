import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import myLogo from '../assets/logo.png'; 

// --- IMPORT FIREBASE AUTH ---
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();
  
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);

  // --- FUNGSI FORMAT NOMOR HP (AUTO SPASI) ---
  const handlePhoneChange = (e) => {
    // 1. Ambil hanya angkanya saja (hapus huruf/simbol)
    let rawValue = e.target.value.replace(/\D/g, '');

    // 2. Jika user iseng ngetik '0' atau '62' di awal, hapus aja biar rapi
    if (rawValue.startsWith('62')) rawValue = rawValue.slice(2);
    if (rawValue.startsWith('0')) rawValue = rawValue.slice(1);

    // 3. Logic Formatter: XXX XXXX XXXX
    let formatted = rawValue;
    if (rawValue.length > 3) {
      // Tambah spasi setelah digit ke-3 (misal: 812 345...)
      formatted = rawValue.slice(0, 3) + ' ' + rawValue.slice(3);
    }
    if (rawValue.length > 7) {
      // Tambah spasi setelah digit ke-7 (misal: 812 3456 789...)
      formatted = rawValue.slice(0, 3) + ' ' + rawValue.slice(3, 7) + ' ' + rawValue.slice(7);
    }

    // 4. Batasi panjang maksimal (biar gak kepanjangan)
    if (formatted.length > 16) return;

    setPhoneNumber(formatted);
  };

  // --- FUNGSI SETUP RECAPTCHA ---
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible', 
        'callback': (response) => {
          // reCAPTCHA solved
        }
      });
    }
  };

  // --- STEP 1: KIRIM OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Masukkan nomor telepon!");

    setIsLoading(true);
    
    // 1. Bersihkan spasi sebelum kirim ke Firebase
    const cleanNumber = phoneNumber.replace(/\s/g, ''); 
    
    // 2. Gabungkan dengan kode negara
    const formattedForFirebase = '+62' + cleanNumber;

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      
      const confirmation = await signInWithPhoneNumber(auth, formattedForFirebase, appVerifier);
      
      setConfirmationResult(confirmation); 
      setStep(2);
      alert("Kode OTP dikirim!");
      
    } catch (error) {
      console.error(error);
      alert("Gagal kirim OTP: " + error.message);
      if(window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setIsLoading(false);
    }
  };

  // --- STEP 2: VERIFIKASI KODE ---
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if(!confirmationResult) return;
    setIsLoading(true);

    try {
      await confirmationResult.confirm(otp);
      alert("Login Berhasil!");
      navigate('/'); 
    } catch (error) {
      alert("Kode OTP Salah!");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-gray-100 relative">
        
        {/* WADAH RECAPTCHA (HIDDEN) */}
        <div id="recaptcha-container"></div>

        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-all"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="text-center mb-8 mt-2">
          <div className="w-20 h-20 bg-teal-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
             <img src={myLogo} alt="HelloCare" className="w-12 h-12 object-contain" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            {step === 1 ? 'Login HelloCare' : 'Verifikasi OTP'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 px-6">
            {step === 1 ? 'Masuk dengan nomor WhatsApp/HP aktif.' : `Masukkan kode OTP yang dikirim.`}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Nomor Telepon</label>
              <div className="relative">
                {/* Visual +62 Statis */}
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold bg-gray-100 px-2 py-1 rounded-md text-sm tracking-wide">+62</span>
                </div>
                
                {/* Input dengan Padding Kiri Besar */}
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange} // Panggil fungsi format tadi
                  className="w-full pl-16 pr-4 py-3.5 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-50 outline-none font-bold text-lg tracking-wide transition-all placeholder:font-normal placeholder:text-gray-300"
                  placeholder="812 3456 7890"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-100 flex items-center justify-center gap-2"
            >
              {isLoading ? 'Memproses...' : <>Kirim Kode OTP <ArrowRight size={18} /></>}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <div>
              <input 
                type="text" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
                maxLength={6}
                className="w-full text-center text-3xl tracking-[0.5em] font-bold py-4 rounded-xl border border-gray-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-50 outline-none transition-all text-gray-800" 
                placeholder="000000" 
                autoFocus
              />
              <p className="text-center text-xs text-gray-400 mt-4">
                Tidak menerima SMS? <span className="text-teal-600 font-bold cursor-pointer hover:underline" onClick={() => setStep(1)}>Kirim Ulang</span>
              </p>
            </div>

            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg"
            >
              {isLoading ? 'Memverifikasi...' : 'Masuk ke Akun'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}