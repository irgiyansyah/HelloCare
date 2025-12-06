import React, { createContext, useState, useEffect, useContext } from 'react';
// Import fungsi-fungsi Firebase
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signOut 
} from 'firebase/auth';
import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot,
  query, 
  orderBy 
} from 'firebase/firestore';

const HelloContext = createContext();

export const HelloProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Default Profile
  const defaultProfile = {
    fullName: '',
    nickName: 'User',
    gender: 'male',
    country: 'Indonesia',
    language: 'id',
    timeZone: 'wita',
    phone: '',
    email: '',
    avatar: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=200&h=200&fit=crop'
  };

  const [profile, setProfile] = useState(defaultProfile);

  // --- 1. MONITOR AUTH & PROFILE (REALTIME) ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        // Jika login, ambil data profil dari Firestore
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile(docSnap.data());
        } else {
          // Jika user baru belum punya data, set default tapi jangan simpan dulu ke DB
          // Biarkan user save sendiri nanti, atau simpan otomatis di sini (opsional)
          setProfile(defaultProfile);
        }
      } else {
        setProfile(defaultProfile);
      }
    });

    return () => unsubscribe();
  }, []);

  // --- 2. LOGOUT ---
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setProfile(defaultProfile);
    localStorage.clear(); // Bersihkan cache biar aman
  };

  // --- 3. UPDATE PROFILE (FIREBASE VERSION) ---
  const updateProfile = async (newData) => {
    if (!user) return { success: false, error: "No user" };

    try {
      // Di Firebase, kita pakai setDoc dengan { merge: true }
      // Ini artinya: Kalau belum ada, buat baru. Kalau sudah ada, update yang berubah aja.
      await setDoc(doc(db, "users", user.uid), {
        ...newData,
        email: newData.email || user.email || "", // Pastikan email tersimpan
        phone: user.phoneNumber, // Simpan nomor HP dari Auth
        updatedAt: new Date()
      }, { merge: true });

      setProfile(newData); // Update state lokal
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      return { success: false, error: error.message };
    }
  };

  // --- 4. BOOKING LOGIC (REALTIME LISTENER) ---
  useEffect(() => {
    // onSnapshot membuat data booking selalu update realtime tanpa refresh
    const q = query(collection(db, "bookings"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const addBooking = async (newBooking) => {
    try {
      await addDoc(collection(db, "bookings"), {
        userId: user?.uid, // PENTING: Simpan ID User
        patient_name: newBooking.patient,
        service: newBooking.service,
        doctor_id: newBooking.doctor_id,
        date: newBooking.date,
        time: newBooking.time,
        payment_method: newBooking.paymentMethod || 'Bayar di Klinik',
        price: newBooking.price || 0,
        status: 'Pending',
        createdAt: new Date()
      });
      return true;
    } catch (error) {
      alert("Gagal booking: " + error.message);
      return false;
    }
  };

  const rescheduleBooking = async (bookingId, newDate, newTime) => {
    try {
      const bookingRef = doc(db, "bookings", bookingId);
      await updateDoc(bookingRef, {
        date: newDate,
        time: newTime,
        status: 'Rescheduled', // Opsional: Beri tanda status berubah
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error("Gagal reschedule:", error);
      return false;
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      const bookingRef = doc(db, "bookings", id);
      await updateDoc(bookingRef, { status: newStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
    } catch (e) {
      console.error(e);
    }
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