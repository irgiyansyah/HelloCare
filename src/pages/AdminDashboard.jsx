import React from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Trash2, 
  Activity, 
  Calendar,
  Search
} from 'lucide-react';
import { useHello } from '../context/HelloContext';

export default function AdminDashboard() {
  const { bookings, loading, updateBookingStatus, deleteBooking } = useHello();

  // --- 1. HITUNG STATISTIK REAL-TIME ---
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed').length,
    cancelled: bookings.filter(b => b.status === 'Cancelled').length
  };

  // Helper Warna Status
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500 mt-1">Pantau semua aktivitas pendaftaran pasien secara real-time.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Live Database Update</span>
          </div>
        </div>

        {/* --- 2. KARTU STATISTIK (DASHBOARD METRICS) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Total */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</h3>
            <p className="text-sm text-gray-500">Pasien Terdaftar</p>
          </div>

          {/* Card 2: Pending (Perlu Tindakan) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
            {stats.pending > 0 && (
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full m-3 animate-ping"></div>
            )}
            <div className="flex justify-between items-start mb-4">
              <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
                <Clock size={24} />
              </div>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">Menunggu</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</h3>
            <p className="text-sm text-gray-500">Perlu Konfirmasi</p>
          </div>

          {/* Card 3: Confirmed (Sukses) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-50 p-3 rounded-xl text-green-600">
                <CheckCircle size={24} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Diterima</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.confirmed}</h3>
            <p className="text-sm text-gray-500">Jadwal Terkonfirmasi</p>
          </div>

          {/* Card 4: Cancelled (Gagal) */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-red-50 p-3 rounded-xl text-red-600">
                <XCircle size={24} />
              </div>
              <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded-lg">Ditolak</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.cancelled}</h3>
            <p className="text-sm text-gray-500">Booking Dibatalkan</p>
          </div>
        </div>

        {/* --- 3. TABEL DATA UTAMA --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          
          {/* Table Header / Toolbar */}
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity size={20} className="text-teal-500" />
              Daftar Masuk Terbaru
            </h2>
            {/* Search Bar Dummy (Visual Only) */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama pasien..." 
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Pasien & Layanan</th>
                  <th className="px-6 py-4">Waktu</th>
                  <th className="px-6 py-4">Dokter / Event</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-500">Memuat data...</td></tr>
                ) : bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <Calendar size={48} className="mb-2" />
                        <p>Belum ada data booking masuk.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group">
                      
                      {/* Kolom 1: Info Pasien */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            {booking.patient_name?.charAt(0) || 'P'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{booking.patient_name}</p>
                            <p className="text-xs text-gray-500">{booking.service}</p>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Waktu */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-gray-700">{booking.date}</span>
                          <span className="text-xs text-gray-500">{booking.time}</span>
                        </div>
                      </td>

                      {/* Kolom 3: Dokter ID / Type */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {booking.doctor_id === 'EVENT' ? '🎟️ Event Ticket' : `👨‍⚕️ Dokter ID: ${booking.doctor_id}`}
                        </span>
                      </td>

                      {/* Kolom 4: Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      {/* Kolom 5: Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-100 transition-opacity">
                          
                          {/* Tampilkan tombol Terima/Tolak HANYA jika status Pending */}
                          {booking.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white transition-all shadow-sm"
                                title="Terima Booking"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all shadow-sm"
                                title="Tolak Booking"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          
                          {/* Tombol Hapus (Selalu Muncul) */}
                          <button 
                            onClick={() => {
                                if(window.confirm("Hapus data ini permanen dari database?")) deleteBooking(booking.id);
                            }}
                            className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-700 hover:text-white transition-all shadow-sm ml-2"
                            title="Hapus Data"
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
          
          {/* Footer Table */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 text-center">
            Menampilkan data <strong>{bookings.length}</strong> pendaftar terakhir dari database Firebase.
          </div>
        </div>

      </div>
    </div>
  );
}