// src/pages/AdminDashboard.jsx
import React from 'react';
import { Users, Calendar, DollarSign, Star, CheckCircle, XCircle, Trash2 } from 'lucide-react';
// 1. Import Context
import { useHello } from '../context/HelloContext';

export default function AdminDashboard() {
  // 2. Ambil Data Real & Fungsi dari Context
  const { bookings, loading, updateBookingStatus, deleteBooking } = useHello();

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700';
      case 'Pending': return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Mitra</h1>
          <p className="text-gray-500">Data Real-Time dari Database</p>
        </div>

        {/* Statistik Real (Berdasarkan jumlah data di DB) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><Users size={24} /></div>
            <div>
              <p className="text-sm text-gray-500">Total Booking</p>
              <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
            </div>
          </div>
          {/* ... Statistik lain bisa dibiarkan statis dulu ... */}
        </div>

        {/* Tabel Data Real */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900">Jadwal Booking Masuk</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm font-semibold text-gray-600 uppercase">
                <tr>
                  <th className="px-6 py-4">Nama Pasien</th>
                  <th className="px-6 py-4">Layanan</th>
                  <th className="px-6 py-4">Waktu</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-8">Memuat data...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr><td colSpan="5" className="text-center py-8">Belum ada data booking.</td></tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50 transition-colors">
                      {/* Perhatikan: pakai booking.patient_name sesuai database */}
                      <td className="px-6 py-4 font-medium text-gray-900">{booking.patient_name}</td>
                      <td className="px-6 py-4 text-gray-600">{booking.service}</td>
                      <td className="px-6 py-4 text-gray-600">
                        <div className="flex flex-col">
                          <span className="font-medium">{booking.date}</span>
                          <span className="text-xs">{booking.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          {/* Tombol UPDATE Status */}
                          {booking.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"
                                title="Terima"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                                title="Tolak"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          
                          {/* Tombol DELETE (Hapus Data) */}
                          <button 
                            onClick={() => {
                                if(window.confirm("Hapus data ini permanen?")) deleteBooking(booking.id);
                            }}
                            className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}