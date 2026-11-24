import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Official Live Firebase Project Configuration for Dream Computer (dream-computer-a5256)
export const firebaseConfig = {
  apiKey: import.meta.env?.VITE_FIREBASE_API_KEY || "AIzaSyA8dRLY3D6K5n1gBZfjj19FyEUzhh0sG9o",
  authDomain: import.meta.env?.VITE_FIREBASE_AUTH_DOMAIN || "dream-computer-a5256.firebaseapp.com",
  projectId: import.meta.env?.VITE_FIREBASE_PROJECT_ID || "dream-computer-a5256",
  storageBucket: import.meta.env?.VITE_FIREBASE_STORAGE_BUCKET || "dream-computer-a5256.firebasestorage.app",
  messagingSenderId: import.meta.env?.VITE_FIREBASE_MESSAGING_SENDER_ID || "849261153980",
  appId: import.meta.env?.VITE_FIREBASE_APP_ID || "1:849261153980:web:7d1eb23b14008b271dcab9",
  measurementId: import.meta.env?.VITE_FIREBASE_MEASUREMENT_ID || "G-TP0R0RFT8Q",
};

// Check if valid Firebase configuration is supplied
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.projectId &&
  firebaseConfig.apiKey.length > 10 &&
  firebaseConfig.projectId !== 'your-project-id'
);

let app = null;
let auth = null;
let db = null;
let storage = null;
let analytics = null;

if (isFirebaseConfigured) {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    }
  } catch (error) {
    console.warn('Firebase initialization warning, falling back to local database engine:', error);
  }
}

export { app, auth, db, storage, analytics };
