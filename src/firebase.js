// src/firebase.js
import { initializeApp } from "firebase/app";
// PENTING: Import fungsi getAuth dan getFirestore
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// PASTE CONFIG DARI FIREBASE CONSOLE DI SINI
const firebaseConfig = {
  apiKey: "AIzaSyCZ0b0JEzD07RyLPwR7A_e_8ApcfQieEgY",
  authDomain: "hellocare-ccb47.firebaseapp.com",
  projectId: "hellocare-ccb47",
  storageBucket: "hellocare-ccb47.firebasestorage.app",
  messagingSenderId: "461148256054",
  appId: "1:461148256054:web:1437d2a95390e8fa6aa597",
  measurementId: "G-H32NQ2H62P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// --- BAGIAN INI YANG MENYEBABKAN ERROR ---
// Pastikan ada kata 'export' di depannya!
export const auth = getAuth(app);
export const db = getFirestore(app);