import React, { useState } from 'react';
import { MapPin, Mail, Globe, ArrowLeft } from 'lucide-react';

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Cancer Seminar",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      date: "1 October 2025",
      time: "14.00 - 16.00 WITA",
      location: "Kwame Nkrumah Circle, Accra Ghana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim lorem sit rhoncus ullamcorper. Dui lorem duis amet vulputate. Nunc lobortis adipiscing faucibus diam amet sed."
    },
    {
      id: 2,
      title: "Cancer Seminar",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      date: "5 October 2025",
      time: "10.00 - 12.00 WITA",
      location: "Kwame Nkrumah Circle, Accra Ghana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim lorem sit rhoncus ullamcorper. Dui lorem duis amet vulputate. Nunc lobortis adipiscing faucibus diam amet sed."
    },
    {
      id: 3,
      title: "Cancer Seminar",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      date: "10 October 2025",
      time: "14.00 - 16.00 WITA",
      location: "Kwame Nkrumah Circle, Accra Ghana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim lorem sit rhoncus ullamcorper. Dui lorem duis amet vulputate. Nunc lobortis adipiscing faucibus diam amet sed."
    },
    {
      id: 4,
      title: "Cancer Seminar",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
      date: "15 October 2025",
      time: "14.00 - 16.00 WITA",
      location: "Kwame Nkrumah Circle, Accra Ghana",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In enim lorem sit rhoncus ullamcorper. Dui lorem duis amet vulputate. Nunc lobortis adipiscing faucibus diam amet sed."
    }
  ];

  // Event List Page
  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-gray-50">

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="hover:text-gray-900 cursor-pointer">Halaman</span>
            <span>/</span>
            <span className="font-semibold text-gray-900">Seminar</span>
          </div>
        </div>

        {/* Title */}
        <div className="max-w-7xl mx-auto px-6 pb-8">
          <h1 className="text-4xl font-bold text-gray-900">Informasi Seminar</h1>
        </div>

        {/* Events Grid with Skeleton */}
        <div className="max-w-7xl mx-auto px-6 pb-16">
          <div className="bg-gray-100 rounded-3xl p-8">
            {/* Skeleton Loading Animation */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 bg-gray-300 rounded-full w-64 animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Events Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <div 
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Banner */}
        <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=300&fit=crop" 
            alt="Medical Equipment"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

      </div>
    );
  }

  // Event Detail Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center text-white font-bold">H</div>
          <span className="text-xl font-bold text-teal-500">HelloCare</span>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span 
            onClick={() => setSelectedEvent(null)}
            className="hover:text-gray-900 cursor-pointer"
          >
            Halaman
          </span>
          <span>/</span>
          <span className="font-semibold text-gray-900">Seminar</span>
        </div>
      </div>

      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 pb-8">
        <h1 className="text-4xl font-bold text-gray-900">Informasi Seminar</h1>
      </div>

      {/* Event Detail */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-gray-100 rounded-3xl p-8">
          {/* Skeleton Loading Animation */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 bg-gray-300 rounded-full w-64 animate-pulse"></div>
            <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
            <div className="h-12 w-12 bg-gray-300 rounded-full animate-pulse"></div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Event Image - Larger */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-full">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title}
                  className="w-full h-full object-cover min-h-[400px]"
                />
              </div>
            </div>

            {/* Event Info Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-blue-600 h-full flex flex-col">
                <h2 className="text-3xl font-bold italic text-gray-900 mb-6">
                  lorem ipsum
                </h2>
                
                <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                  {selectedEvent.description}
                </p>

                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="w-full bg-white border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-semibold hover:bg-blue-600 hover:text-white transition-colors text-lg"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Banner */}
      <div className="w-full h-64 bg-gradient-to-br from-blue-400 to-purple-600 relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1200&h=300&fit=crop" 
          alt="Medical Equipment"
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-blue-900 to-blue-700 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-teal-400 rounded-lg flex items-center justify-center text-white font-bold text-xl">H</div>
              <span className="text-2xl font-bold">HelloCare</span>
            </div>
            <div className="space-y-3 text-sm opacity-90">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>HelloCare<br />Jl. R.P. Soeroso No.2-4 Jakarta Pusat, 10330, Indonesia</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="flex-shrink-0" />
                <span>contact@HelloCare.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe size={18} className="flex-shrink-0" />
                <span>www.HelloCare.id</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Kebijakan & Dukungan</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Kebijakan Privasi</li>
              <li>Syarat & Ketentuan</li>
              <li>Hak Cipta & Legalitas</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Ikuti kami</h3>
            <ul className="space-y-2 text-sm opacity-90">
              <li>📱 Hellocare</li>
              <li>📷 @hellocare.go</li>
              <li>👍 Hellocare</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}