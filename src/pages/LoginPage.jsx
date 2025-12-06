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

  // --- FUNGSI SETUP RECAPTCHA ---
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible', // Invisible biar gak ganggu UI
        'callback': (response) => {
        }
      });
    }
  };

  // --- STEP 1: KIRIM OTP ---
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber) return alert("Masukkan nomor telepon!");

    setIsLoading(true);
    
    // Format nomor ke +62
    let formattedPhone = phoneNumber.replace(/\D/g, ''); 
    if (formattedPhone.startsWith('0')) formattedPhone = '62' + formattedPhone.slice(1);
    if (!formattedPhone.startsWith('62')) formattedPhone = '62' + formattedPhone;
    formattedPhone = '+' + formattedPhone;

    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      
      // Request ke Firebase
      const confirmation = await signInWithPhoneNumber(auth, formattedPhone, appVerifier);
      
      setConfirmationResult(confirmation); 
      setStep(2);
      alert("Kode OTP dikirim via SMS / WhatsApp Firebase!");
      
    } catch (error) {
      console.error(error);
      alert("Gagal kirim OTP: " + error.message);
      // Reset recaptcha jika gagal
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
        
        {/* --- PENTING: WADAH RECAPTCHA (HIDDEN) --- */}
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
            {step === 1 ? 'Login' : 'Verifikasi OTP'}
          </h1>
          <p className="text-gray-500 text-sm mt-2 px-6">
            {step === 1 ? 'Masuk dengan nomor telepon Anda.' : `Masukkan kode OTP.`}
          </p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 outline-none font-medium"
                placeholder="08123456789"
                required
              />
            </div>
            <button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-teal-500 text-white py-3.5 rounded-xl font-semibold hover:bg-teal-600 transition-all shadow-lg flex items-center justify-center gap-2"
            >
              {isLoading ? 'Memproses...' : <>Kirim Kode OTP <ArrowRight size={18} /></>}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
            <input 
              type="text" 
              value={otp} 
              onChange={(e) => setOtp(e.target.value)} 
              className="w-full text-center text-3xl tracking-[0.3em] font-bold py-4 rounded-xl border border-gray-200 focus:border-teal-500 outline-none" 
              placeholder="000000" 
              autoFocus
            />
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