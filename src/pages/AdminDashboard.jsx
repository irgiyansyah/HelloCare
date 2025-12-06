import React, { useState } from 'react';
import { 
  Users, Clock, CheckCircle, XCircle, Trash2, 
  Activity, Calendar, Search, Wallet, DollarSign, Filter
} from 'lucide-react';
import { useHello } from '../context/HelloContext';

export default function AdminDashboard() {
  const { bookings, loading, updateBookingStatus, deleteBooking } = useHello();
  const [filterType, setFilterType] = useState('All'); // 'All', 'Doctor', 'Event'

  // --- 1. HITUNG STATISTIK KEUANGAN & DATA ---
  const stats = {
    total: bookings.length,
    revenue: bookings
      .filter(b => b.status !== 'Cancelled') // Hitung yg tidak batal
      .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0),
    pending: bookings.filter(b => b.status === 'Pending').length,
    confirmed: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Rescheduled').length,
  };

  // Format Rupiah
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  };

  // Filter Data Tabel
  const filteredBookings = bookings.filter(item => {
    if (filterType === 'All') return true;
    if (filterType === 'Event') return item.doctor_id === 'EVENT';
    if (filterType === 'Doctor') return item.doctor_id !== 'EVENT';
    return true;
  });

  // Helper Warna Status
  const getStatusStyle = (status) => {
    switch(status) {
      case 'Confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'Rescheduled': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-500 mt-1">Laporan pendaftaran & keuangan klinik.</p>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-600">Database Live</span>
          </div>
        </div>

        {/* --- 2. KARTU STATISTIK UTAMA --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1: Revenue (Uang Masuk) */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                <DollarSign size={24} className="text-white" />
              </div>
              <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">Estimasi</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{formatRupiah(stats.revenue)}</h3>
            <p className="text-blue-100 text-sm">Total Pendapatan</p>
          </div>

          {/* Card 2: Total Pasien */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-purple-50 p-3 rounded-xl text-purple-600">
                <Users size={24} />
              </div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">Total</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.total}</h3>
            <p className="text-sm text-gray-500">Booking Masuk</p>
          </div>

          {/* Card 3: Perlu Tindakan */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden">
            {stats.pending > 0 && <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full m-3 animate-ping"></div>}
            <div className="flex justify-between items-start mb-4">
              <div className="bg-yellow-50 p-3 rounded-xl text-yellow-600">
                <Clock size={24} />
              </div>
              <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">Pending</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.pending}</h3>
            <p className="text-sm text-gray-500">Menunggu Konfirmasi</p>
          </div>

          {/* Card 4: Sukses */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-green-50 p-3 rounded-xl text-green-600">
                <CheckCircle size={24} />
              </div>
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">Sukses</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-1">{stats.confirmed}</h3>
            <p className="text-sm text-gray-500">Jadwal Aktif</p>
          </div>
        </div>

        {/* --- 3. FILTER TAB & SEARCH --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          {/* Tabs */}
          <div className="bg-white p-1 rounded-xl border border-gray-200 flex gap-1">
            {['All', 'Doctor', 'Event'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all
                  ${filterType === type ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
              >
                {type === 'All' ? 'Semua' : type === 'Doctor' ? 'Dokter Medis' : 'Event Seminar'}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama pasien..." 
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-blue-500 text-sm bg-white"
            />
          </div>
        </div>

        {/* --- 4. TABEL DATA LENGKAP --- */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr className="text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Pasien & Layanan</th>
                  <th className="px-6 py-4">Waktu</th>
                  <th className="px-6 py-4">Pembayaran</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-500">Memuat data...</td></tr>
                ) : filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-12">
                      <div className="flex flex-col items-center justify-center opacity-50">
                        <Calendar size={48} className="mb-2" />
                        <p>Tidak ada data ditemukan.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-blue-50/30 transition-colors group">
                      
                      {/* Kolom 1: Pasien */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold
                            ${booking.doctor_id === 'EVENT' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                            {booking.patient_name?.charAt(0).toUpperCase() || 'P'}
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{booking.patient_name}</p>
                            <p className="text-xs text-gray-500 font-medium">
                              {booking.doctor_id === 'EVENT' ? '🎫 Seminar Ticket' : booking.service}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 2: Waktu (Cek Reschedule) */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-700">{booking.date}</span>
                          <span className="text-xs text-gray-500">{booking.time}</span>
                          {booking.status === 'Rescheduled' && (
                            <span className="text-[10px] text-purple-600 bg-purple-50 px-1 rounded w-fit mt-1">
                              *Jadwal Baru
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Kolom 3: Pembayaran (BARU) */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="bg-gray-100 p-1.5 rounded-lg text-gray-600">
                            <Wallet size={16} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{formatRupiah(booking.price || 0)}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-semibold tracking-wide">
                              {booking.payment_method || 'Manual'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Kolom 4: Status Badge */}
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusStyle(booking.status)}`}>
                          {booking.status === 'Rescheduled' ? 'Dijadwal Ulang' : booking.status}
                        </span>
                      </td>

                      {/* Kolom 5: Aksi */}
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          
                          {/* Tombol Aksi hanya untuk Pending */}
                          {booking.status === 'Pending' && (
                            <>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-500 hover:text-white border border-green-100"
                                title="Terima"
                              >
                                <CheckCircle size={18} />
                              </button>
                              <button 
                                onClick={() => updateBookingStatus(booking.id, 'Cancelled')}
                                className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white border border-red-100"
                                title="Tolak"
                              >
                                <XCircle size={18} />
                              </button>
                            </>
                          )}
                          
                          <button 
                            onClick={() => { if(window.confirm("Hapus permanen?")) deleteBooking(booking.id); }}
                            className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-700 hover:text-white border border-gray-200"
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
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between">
             <span>Data terakhir diperbarui dari Firebase.</span>
             <span>Total Baris: <strong>{filteredBookings.length}</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
}