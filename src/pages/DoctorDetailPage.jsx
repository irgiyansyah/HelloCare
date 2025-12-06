import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import { ArrowLeft, MapPin, Calendar, Phone, MessageCircle, Star, Smile, ThumbsUp } from 'lucide-react';

export default function DoctorDetailPage() {
  const navigate = useNavigate(); 
  const { id } = useParams(); // 1. Ambil ID dari URL (misal: 1, 2, atau 6)

  const [showFullAbout, setShowFullAbout] = useState(false);
  const [doctor, setDoctor] = useState(null);

  // 2. DATA DOKTER (Sama persis dengan Landing Page)
  // Idealnya ini disimpan di file terpisah atau database, tapi untuk sekarang kita taruh sini biar jalan.
  const doctorsData = [
    { 
      id: 1,
      name: "Dr Y K Mishra", 
      specialty: "Orthopedics Surgeon", 
      hospital: "Apollo Hospital",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      about: "Dr. Mishra adalah spesialis bedah ortopedi dengan pengalaman lebih dari 20 tahun. Beliau dikenal sangat teliti dalam menangani cedera tulang belakang dan persendian."
    },
    { 
      id: 2,
      name: "Dr. Sandeep", 
      specialty: "Orthopedics Surgeon", 
      hospital: "MBBS",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop",
      about: "Lulusan terbaik universitas ternama, Dr. Sandeep memadukan teknologi modern dengan pendekatan personal dalam setiap operasi ortopedi yang ditanganinya."
    },
    { 
      id: 3,
      name: "Dr. Rajeev Verma", 
      specialty: "Orthopedics and Joint", 
      hospital: "Apollo Hospital",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop",
      about: "Spesialis persendian yang telah menangani ribuan kasus radang sendi. Pendekatan beliau berfokus pada pemulihan mobilitas pasien tanpa rasa sakit."
    },
    { 
      id: 4,
      name: "Dr. Ajay Kaul", 
      specialty: "Orthopedics Surgeon", 
      hospital: "MBBS, DNB",
      image: "https://images.unsplash.com/photo-1612531386530-97286d97c2d2?w=400&h=400&fit=crop",
      about: "Dr. Ajay Kaul adalah ahli bedah yang berdedikasi tinggi. Beliau aktif dalam berbagai seminar internasional mengenai inovasi bedah tulang."
    },
    { 
      id: 5,
      name: "Dr Naresh Trehan", 
      specialty: "Cardiovascular Surgeon", 
      hospital: "Surgeon",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      about: "Salah satu ahli bedah kardiovaskular terbaik. Dr. Trehan memiliki reputasi global dalam menangani operasi jantung kompleks dan bypass."
    },
    { 
      id: 6,
      name: "Dr Vinod Raina", 
      specialty: "Medical Oncologist Specialist", 
      hospital: "Oncology",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop",
      about: "Dr. Vinod Raina adalah ahli onkologi (kanker) yang penuh empati. Beliau fokus pada perawatan kemoterapi dan imunoterapi terkini."
    },
    { 
      id: 7,
      name: "Dr Arun Saroha", 
      specialty: "Orthopedics Surgeon", 
      hospital: "MBBS",
      image: "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=400&h=400&fit=crop",
      about: "Dokter muda berbakat di bidang ortopedi umum. Sangat disukai pasien anak-anak dan lansia karena keramahannya."
    }
  ];

  // 3. LOGIKA CARI DOKTER
  useEffect(() => {
    // Cari dokter yang ID-nya sama dengan URL
    const foundDoctor = doctorsData.find(d => d.id === parseInt(id));
    
    if (foundDoctor) {
      setDoctor(foundDoctor);
    } else {
      // Jika ID ngawur (misal /doctor/999), balikin ke home
      navigate('/');
    }
  }, [id, navigate]);

  // Tampilkan Loading jika data belum ketemu
  if (!doctor) return <div className="p-10 text-center">Memuat data dokter...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Tombol Back */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Kembali</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Doctor Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-8 shadow-lg sticky top-24">
              
              {/* Foto Dokter DINAMIS */}
              <div className="relative mb-6">
                <div className="w-48 h-48 mx-auto bg-white rounded-full overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-3 bg-blue-600 text-white px-4 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-md">
                  <Star size={14} className="fill-white" />
                  <span>4.8</span>
                </div>
              </div>

              {/* Contact Icons */}
              <div className="flex justify-center gap-4 mb-6 mt-8">
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <Calendar size={20} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <Phone size={20} className="text-blue-600" />
                </button>
                <button className="w-12 h-12 bg-white rounded-xl flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm">
                  <MessageCircle size={20} className="text-blue-600" />
                </button>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">Rp 150.000</div>
                <div className="text-sm text-gray-600">Sesi Konsultasi</div>
              </div>

              {/* Tombol Booking */}
              <button 
                onClick={() => navigate(`/booking/${doctor.id}`)}
                className="w-full bg-blue-900 text-white py-4 rounded-xl font-semibold hover:bg-blue-800 transition-colors mb-6 shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
              >
                Book Appointment
              </button>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 text-gray-700">
                  <Smile size={16} className="text-blue-600" /> Ramah
                </span>
                <span className="px-4 py-2 bg-white rounded-full text-sm flex items-center gap-2 text-gray-700">
                  <ThumbsUp size={16} className="text-blue-600" /> Profesional
                </span>
              </div>
            </div>
          </div>

          {/* Right Content - Doctor Info */}
          <div className="lg:col-span-2">
            
            {/* Header Info DINAMIS */}
            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6 border border-gray-100">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
              <p className="text-xl text-teal-600 font-medium mb-6">{doctor.specialty}</p>
              
              <div className="flex items-center gap-2 text-gray-700 mb-6 bg-gray-50 w-fit px-4 py-2 rounded-lg">
                <MapPin size={20} className="text-red-500" />
                <span className="font-medium">{doctor.hospital} - Jakarta, Indonesia</span>
              </div>
              
              <p className="text-gray-600 leading-relaxed">
                {doctor.about}
              </p>
            </div>

            {/* Specialities */}
            <div className="bg-white rounded-3xl p-8 shadow-sm mb-6 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Layanan Medis</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-6 py-3 border border-blue-100 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  Konsultasi Online
                </span>
                <span className="px-6 py-3 border border-blue-100 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  Pemeriksaan Fisik
                </span>
                <span className="px-6 py-3 border border-blue-100 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  Resep Digital
                </span>
                <span className="px-6 py-3 border border-blue-100 bg-blue-50 text-blue-700 rounded-xl font-medium">
                  Tindak Lanjut
                </span>
              </div>
            </div>

            {/* About Full */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang Dokter</h2>
              <div className={`text-gray-600 leading-relaxed ${!showFullAbout && 'line-clamp-4'}`}>
                <p className="mb-4">
                  {doctor.name} adalah seorang profesional medis yang berdedikasi tinggi. 
                  Beliau menyelesaikan pendidikan kedokterannya di universitas terkemuka dan telah 
                  mengikuti berbagai pelatihan spesialis untuk meningkatkan keahliannya.
                </p>
                <p className="mb-4">
                  Dalam praktiknya, beliau selalu mengutamakan kenyamanan dan pemahaman pasien 
                  terhadap kondisi kesehatan mereka. Pendekatan holistik yang diterapkan membantu 
                  pasien tidak hanya sembuh secara fisik, tetapi juga merasa tenang selama proses pengobatan.
                </p>
                <p>
                  Beliau juga aktif dalam komunitas medis dan sering menjadi pembicara dalam seminar kesehatan.
                  Jadwal praktiknya sangat padat, namun beliau selalu meluangkan waktu untuk konsultasi mendalam.
                </p>
              </div>
              <button 
                onClick={() => setShowFullAbout(!showFullAbout)}
                className="text-blue-600 font-semibold mt-4 hover:underline"
              >
                {showFullAbout ? 'Lebih Sedikit' : 'Baca Selengkapnya'}
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}