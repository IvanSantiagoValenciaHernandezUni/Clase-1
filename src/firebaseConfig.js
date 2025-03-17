import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_VYxwkd3F42QE-Sj2rTgU0AvioCC-vrM",
  authDomain: "correccion-67d2e.firebaseapp.com",
  projectId: "correccion-67d2e",
  storageBucket: "correccion-67d2e.firebasestorage.app",
  messagingSenderId: "289333370212",
  appId: "1:289333370212:web:55de2e6391e98d820aee71",
  measurementId: "G-L9XHWWPVBE"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Firestore
const db = getFirestore(app);

export { db };
