import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../supabaseClient'; 

const HelloContext = createContext();

export const HelloProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  
  // Default Profil Kosong
  const defaultProfile = {
    fullName: '',
    nickName: 'User',
    gender: 'male',
    country: 'Indonesia',
    language: 'id',
    timeZone: 'wita',
    phone: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop'
  };

  const [profile, setProfile] = useState(defaultProfile);

  const updateProfile = (newData) => {
    setProfile(newData);
    if (user) {
      localStorage.setItem(`hellocare_profile_${user.id}`, JSON.stringify(newData));
    }
  };

  // --- AUTHENTICATION ---
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user || null;
      setUser(currentUser);

      if (currentUser) {
        // Load profil jika user ada
        const savedProfile = localStorage.getItem(`hellocare_profile_${currentUser.id}`);
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        } else {
          // Setup profil baru untuk user baru
          let phoneFromEmail = '';
          if (currentUser.email && currentUser.email.includes('@hellocare.demo')) {
             phoneFromEmail = currentUser.email.split('@')[0];
          }
          const newProfile = { ...defaultProfile, phone: phoneFromEmail, email: currentUser.email || '' };
          setProfile(newProfile);
        }
      } else {
        setProfile(defaultProfile);
      }
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      if (!session?.user) {
        setProfile(defaultProfile); // Reset profil jika sesi habis
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // --- PERBAIKAN FUNGSI LOGOUT ---
  const logout = async () => {
    try {
      // 1. Request logout ke Supabase
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Logout Error:", error);
    } finally {
      // 2. PAKSA Hapus data di state aplikasi (Apapun yang terjadi)
      setUser(null);
      setProfile(defaultProfile);
    }
  };

  // --- BOOKING LOGIC ---
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setBookings(data);
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const addBooking = async (newBooking) => {
    try {
      const { data, error } = await supabase.from('bookings').insert([{ 
            patient_name: newBooking.patient,
            service: newBooking.service,
            doctor_id: newBooking.doctor_id,
            date: newBooking.date,
            time: newBooking.time,
            status: 'Pending'
          }]).select();
      if (error) throw error;
      setBookings(prev => [data[0], ...prev]);
      return true;
    } catch (error) {
      alert("Gagal: " + error.message);
      return false;
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    await supabase.from('bookings').update({ status: newStatus }).eq('id', id);
    setBookings(prev => prev.map(item => item.id === id ? { ...item, status: newStatus } : item));
  };

  const deleteBooking = async (id) => {
    await supabase.from('bookings').delete().eq('id', id);
    setBookings(prev => prev.filter(item => item.id !== id));
  };

  return (
    <HelloContext.Provider value={{ 
      user, logout, 
      profile, updateProfile,
      bookings, loading, addBooking, updateBookingStatus, deleteBooking 
    }}>
      {children}
    </HelloContext.Provider>
  );
};

export const useHello = () => useContext(HelloContext);