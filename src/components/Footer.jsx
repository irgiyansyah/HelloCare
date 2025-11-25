import React from 'react';
import { Link } from 'react-router-dom'; 
import { Phone, Mail, Globe, MapPin } from 'lucide-react';

// Import logo di sini juga
import myLogo from '../assets/logo.png'; 

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-700 text-white mt-16 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              {/* LOGO FOOTER DENGAN KOTAK PUTIH */}
              <div className="bg-white p-1.5 rounded-lg shadow-lg">
                <img 
                  src={myLogo} 
                  alt="HelloCare Logo" 
                  className="h-8 w-auto object-contain" 
                />
              </div>
              {/* TEKS HELLOCARE */}
              <span className="text-2xl font-bold">HelloCare</span>
            </div>
            
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>Alamat: Jl. Poros Malino</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>contact@hellocare.net</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="flex-shrink-0" />
                <span>www.hellocare.id</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Kebijakan & Dukungan</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
              <li>Info Obat & Layaknya</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ikuti kami</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Hellocare</li>
              <li>@hellocare.go</li>
              <li>Hellocare</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-500/30 mt-12 pt-8 text-center text-sm opacity-70">
          <p>&copy; 2025 HelloCare. All rights reserved.</p>
          
          <Link 
            to="/admin" 
            className="text-xs text-blue-300 hover:text-white mt-2 inline-block transition-colors"
          >
            .
          </Link>
        </div>

      </div>
    </footer>
  );
}