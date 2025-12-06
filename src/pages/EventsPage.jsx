import React, { useState } from 'react';
import { MapPin, Calendar, Clock, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import Logic & Components
import { useHello } from '../context/HelloContext';
import LoginModal from '../components/LoginModal';

export default function EventsPage() {
  const navigate = useNavigate();
  const { user, profile, addBooking } = useHello(); // Ambil fungsi booking dari context
  
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // DATA SEMINAR
  const events = [
    {
      id: 1,
      title: "Pencegahan Kanker Modern",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
      date: "09 Des 2025",
      time: "14.00 - 16.00 WITA",
      location: "Aula Hasanuddin, Makassar",
      price: "Gratis",
      description: "Menghadapi tantangan kesehatan di abad ke-21, pemahaman mengenai pencegahan kanker tidak lagi sekadar wawasan umum, melainkan kebutuhan mendesak bagi setiap individu. Sesi ini akan mengupas tuntas metode pencegahan kanker berbasis sains modern, mulai dari pentingnya deteksi dini dengan teknologi skrining terbaru hingga adaptasi gaya hidup anti-karsinogenik yang praktis. Kami mengajak peserta untuk beralih dari sekadar mengobati menjadi proaktif mencegah, membekali diri dengan pengetahuan medis terkini untuk menekan risiko kanker secara signifikan demi kualitas hidup jangka panjang yang lebih baik."
    },
    {
      id: 2,
      title: "Mental Health di Era Digital",
      image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=600&h=400&fit=crop",
      date: "07 Des2025",
      time: "10.00 - 12.00 WITA",
      location: "Zoom Meeting (Online)",
      price: "Rp 50.000",
      description: "Di tengah arus informasi yang tak terbendung dan tuntutan konektivitas 24 jam, menjaga kewarasan menjadi tantangan tersendiri bagi masyarakat modern. Sesi ini didedikasikan untuk membedah dampak psikologis dari kehidupan digital, mulai dari fenomena fear of missing out (FOMO), kecemasan akibat media sosial, hingga digital burnout. Peserta akan diajak menyelami strategi membangun resiliensi mental, menetapkan batasan digital yang sehat, serta teknik manajemen stres yang efektif agar tetap produktif dan bahagia tanpa harus kehilangan jati diri di dunia maya."
    },
    {
      id: 3,
      title: "Gizi Seimbang untuk Anak",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=400&fit=crop",
      date: "10 Des 2025",
      time: "09.00 - 11.00 WITA",
      location: "RS HelloCare Lt. 3",
      price: "Gratis",
      description: "Masa depan anak dimulai dari apa yang ada di piring makan mereka hari ini. Sesi parenting dan gizi ini hadir untuk menjawab kebingungan orang tua dalam memenuhi kebutuhan nutrisi esensial bagi generasi emas. Para ahli akan memaparkan panduan komprehensif mengenai komposisi gizi seimbang yang krusial untuk perkembangan otak dan fisik anak, serta strategi cerdas mengatasi masalah umum seperti picky eater atau kecanduan makanan cepat saji. Ini adalah panduan lengkap untuk memastikan anak tumbuh sehat, cerdas, dan terhindar dari risiko masalah kesehatan degeneratif di masa depan."
    },
    {
      id: 4,
      title: "Workshop Pertolongan Pertama",
      image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&h=400&fit=crop",
      date: "15 Des 2025",
      time: "13.00 - 17.00 WITA",
      location: "Lapangan Karebosi",
      price: "Rp 100.000",
      description: "Pelatihan praktis CPR dan penanganan luka darurat. Sertifikat resmi akan diberikan kepada seluruh peserta."
    }
  ];

  // LOGIKA BOOKING SEMINAR
  const handleJoinEvent = async () => {
    // 1. Cek Login
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    // 2. Proses Booking
    setIsBooking(true);
    
    // Kita gunakan fungsi addBooking yang sama, tapi kita modifikasi datanya
    const success = await addBooking({
      patient: profile?.fullName || user.phoneNumber || "Peserta Umum", // Nama Peserta
      service: `Seminar: ${selectedEvent.title}`, // Nama Layanan jadi Nama Event
      doctor_id: "EVENT", // Penanda bahwa ini event
      date: selectedEvent.date,
      time: selectedEvent.time
    });

    setIsBooking(false);

    if (success) {
      setBookingSuccess(true);
      // Reset setelah 3 detik
      setTimeout(() => {
        setBookingSuccess(false);
        setSelectedEvent(null); // Kembali ke list
      }, 3000);
    }
  };

  // --- TAMPILAN LIST EVENT ---
  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 py-16 px-6 text-white text-center">
          <h1 className="text-4xl font-bold mb-2">Jadwal Seminar & Workshop</h1>
          <p className="opacity-90">Tingkatkan wawasan kesehatan Anda bersama ahli kami.</p>
        </div>

        <div className="max-w-7xl mx-auto px-6 -mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {events.map((event) => (
              <div 
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:-translate-y-1 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-blue-800 px-4 py-1 rounded-full text-sm font-bold shadow-sm">
                    {event.price}
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-2 text-teal-600 text-sm font-semibold mb-2">
                    <Calendar size={16} /> {event.date}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-500 text-sm">
                    <span className="flex items-center gap-1"><Clock size={16} /> {event.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={16} /> {event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN DETAIL EVENT ---
  return (
    <div className="min-h-screen bg-gray-50">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* Breadcrumb / Back */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <button 
          onClick={() => setSelectedEvent(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors font-medium"
        >
          <ArrowLeft size={20} /> Kembali ke Daftar
        </button>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100">
          
          {/* Hero Image */}
          <div className="h-80 md:h-[400px] w-full relative">
            <img 
              src={selectedEvent.image} 
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <span className="bg-blue-600 px-4 py-1 rounded-lg text-sm font-bold mb-3 inline-block">
                {selectedEvent.price}
              </span>
              <h1 className="text-3xl md:text-5xl font-bold">{selectedEvent.title}</h1>
            </div>
          </div>

          <div className="p-8 md:p-12 grid md:grid-cols-3 gap-12">
            
            {/* Main Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Deskripsi Acara</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {selectedEvent.description}
                </p>
               
              </div>

              {/* Feedback Sukses */}
              {bookingSuccess && (
                <div className="bg-green-50 border border-green-200 text-green-700 p-6 rounded-2xl flex items-center gap-4 animate-fade-in">
                  <CheckCircle size={32} />
                  <div>
                    <h3 className="font-bold text-lg">Pendaftaran Berhasil!</h3>
                    <p>Tiket seminar telah tersimpan di akun Anda.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Action */}
            <div className="md:col-span-1">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200 sticky top-24">
                <h3 className="font-bold text-gray-900 mb-6 text-lg">Detail Jadwal</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Tanggal</p>
                      <p className="font-semibold text-gray-900">{selectedEvent.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                      <Clock size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Waktu</p>
                      <p className="font-semibold text-gray-900">{selectedEvent.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lokasi</p>
                      <p className="font-semibold text-gray-900">{selectedEvent.location}</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleJoinEvent}
                  disabled={isBooking || bookingSuccess}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1
                    ${bookingSuccess 
                      ? 'bg-green-600 text-white cursor-default' 
                      : 'bg-gradient-to-r from-blue-700 to-teal-500 text-white hover:shadow-blue-200'
                    }`}
                >
                  {isBooking ? 'Memproses...' : bookingSuccess ? 'Terdaftar' : 'Daftar Sekarang'}
                </button>
                <p className="text-xs text-center text-gray-400 mt-4">
                  Kuota terbatas. Segera amankan kursi Anda.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}