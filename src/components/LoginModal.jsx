import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, X } from 'lucide-react';

export default function LoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center px-4">
      {/* Layar Gelap Transparan */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>

      {/* Kotak Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>

        <div className="text-center">
          <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn size={28} />
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Login Diperlukan
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            Maaf, Anda harus login terlebih dahulu untuk mengakses fitur ini.
          </p>

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Nanti
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="flex-1 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}