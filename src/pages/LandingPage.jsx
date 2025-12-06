import React, { useState } from 'react';
import { Phone, Mail, Globe, MapPin, Star } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
// Import Context & Modal
import { useHello } from '../context/HelloContext';
import LoginModal from '../components/LoginModal';

import dokterImg from '../assets/dokter.png'; 

export default function LandingPage() {
  const { user } = useHello();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Logika Cek Login
  const handleRestrictedAccess = (path) => {
    if (user) {
      navigate(path);
    } else {
      setShowModal(true);
    }
  };

  // --- DATA DOKTER UPDATE (SUDAH ADA FOTO) ---
  const doctors = [
    { 
      id: 1,
      name: "Dr Y K Mishra", 
      specialty: "Orthopedics Surgeon", 
      hospital: "Apollo Hospital",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop"
    },
    { 
      id: 2,
      name: "Dr. Sandeep", 
      specialty: "Orthopedics Surgeon", 
      hospital: "MBBS",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=200&h=200&fit=crop"
    },
    { 
      id: 3,
      name: "Dr. Rajeev Verma", 
      specialty: "Orthopedics and Joint", 
      hospital: "Apollo Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&h=200&fit=crop"
    },
    { 
      id: 4,
      name: "Dr. Ajay Kaul", 
      specialty: "Orthopedics Surgeon", 
      hospital: "MBBS, DNB",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=200&h=200&fit=crop"
    },
    { 
      id: 5,
      name: "Dr Naresh Trehan", 
      specialty: "Cardiovascular Surgeon", 
      hospital: "Surgeon",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop"
    },
    { 
      id: 6,
      name: "Dr Vinod Raina", 
      specialty: "Medical Oncologist specialist", 
      hospital: "Oncology",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
    },
    { 
      id: 7,
      name: "Dr Arun Saroha", 
      specialty: "Orthopedics specialist", 
      hospital: "MBBS",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=200&h=200&fit=crop"
    }
  ];

  const testimonials = [
    { name: "Muh. Fajri Farid", text: "Platform yang bagus! Saran nya gacor, website ini membantu saya untuk memiliki obat dan pemeriksaan yang baik", rating: 5},
    { name: "Adnan anan", text: "Saya mengalami rusuh, dan sakit-sakitan. Web ini membantu saya untuk mencari obat yang lebih yang untuk mengobati dan menyembuhkan penyakit saya", rating: 5 },
    { name: "Abil Arqam", text: "Saya sering batuk dan yang terus yang terus yang terus yang hingga penglonakan dengan adanya web ini saya bisa menemukan obat dan mendapatkan untuk sembauh", rating: 5 },
    { name: "Rahmatullah Setiawan", text: "Beberapa hari ini mata saya sering sekali merah dan gatal, lewat web ini saya dapat berkonsultasi dengan dokter mata secara kendala yang saya alami.", rating: 4 },
    { name: "Muh. Alif Anshar", text: "Saya mengalami gejala lever saya yang sering terjadi sekian kali saya makan dengan mengalami alergi dan web ini membantu cara mengobati penyakit apa yang sedang saya derita ini!!!", rating: 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* MODAL POPUP */}
      <LoginModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-16 mx-6 mt-6 rounded-3xl">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-teal-400">Hello</span>Care
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Semua kebutuhan kesehatan Anda,<br />
              mulai dari konsultasi hingga layanan<br />
              medis, ada dalam satu platform.
            </p>
            
            {/* Tombol Daftar (Hanya muncul jika belum login) */}
            {!user ? (
              <Link to="/login">
                 <button className="bg-teal-400 text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-teal-300 transition-colors">
                   Daftar Sekarang
                 </button>
              </Link>
            ) : (
              <button 
                onClick={() => document.getElementById('doctors-section').scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-900 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
              >
                Cari Dokter
              </button>
            )}

          </div>
          <div className="flex justify-center">
            <img 
              src={dokterImg} 
              alt="Dokter HelloCare"
              className="w-80 h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </section>

      {/* Service Images */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <img 
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop" 
            alt="Consultation"
            className="w-full h-48 object-cover rounded-2xl shadow-sm"
          />
          <img 
            src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop" 
            alt="Pharmacy"
            className="w-full h-48 object-cover rounded-2xl shadow-sm"
          />
          <img 
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=300&fit=crop" 
            alt="Hospital"
            className="w-full h-48 object-cover rounded-2xl shadow-sm"
          />
        </div>
      </section>

      {/* Doctors Section */}
      <section id="doctors-section" className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-2">
          <span className="text-teal-500">HelloCare's</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Top rated <span className="text-blue-600 font-semibold">doctors</span> here to assist you!
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4">
          {doctors.map((doctor, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 shadow-sm text-center hover:shadow-md transition-shadow">
              
              {/* --- BAGIAN UPDATE: MENAMPILKAN FOTO --- */}
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-20 h-20 mx-auto mb-3 rounded-full object-cover border-2 border-blue-100 shadow-sm"
              />
              
              <h3 className="font-semibold text-sm mb-1">{doctor.name}</h3>
              <p className="text-xs text-gray-500 mb-1">{doctor.specialty}</p>
              <p className="text-xs text-gray-400 mb-3">{doctor.hospital}</p>
              
              <button 
                onClick={() => handleRestrictedAccess(`/doctor/${doctor.id}`)}
                className="block w-full py-2 border border-blue-600 text-blue-600 rounded-lg text-xs hover:bg-blue-600 hover:text-white transition-colors"
              >
                Consult Now
              </button>

            </div>
          ))}
        </div>
        <button className="text-blue-600 text-sm font-semibold hover:underline">View All</button>
      </section>

      {/* Live Event Section */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden grid md:grid-cols-2">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop" 
            alt="Event"
            className="w-full h-full object-cover"
          />
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-teal-500 font-semibold">Our LIVE event</span>
            </div>
            <h3 className="text-2xl font-bold italic mb-4">Seminar Kesehatan Nasional</h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              Bergabunglah dengan seminar eksklusif kami membahas pencegahan penyakit modern. Dapatkan wawasan langsung dari para ahli.
            </p>
            <div className="bg-blue-900 text-white rounded-2xl p-6 flex justify-between items-center">
              <div>
                <div className="text-2xl font-bold">Desember 2025</div>
                <div className="text-sm opacity-90">09.00 - 17.00 WITA</div>
              </div>
              
              <button 
                onClick={() => handleRestrictedAccess('/events')}
                className="bg-white text-blue-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
              >
                Pesan Sekarang
              </button>
              
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-teal-500 mb-8">Let's hear from them</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-600">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <span className="font-semibold text-sm">{testimonial.name}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">{testimonial.text}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? "fill-blue-600 text-blue-600" : "text-gray-300"}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}