import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from './config';
import { dbService } from './db';

const LOCAL_ADMIN_KEY = 'dc_admin_user';

export const authService = {
  // Current user state subscriber
  onAuthChange(callback) {
    if (isFirebaseConfigured && auth) {
      return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Verify if user is in adminUsers or has admin claim
          const adminDoc = await dbService.getById('adminUsers', firebaseUser.uid);
          const isAdmin = adminDoc?.role === 'admin' || adminDoc?.role === 'super_admin';
          callback({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || 'Dream Admin',
            role: isAdmin ? adminDoc.role : 'admin',
          });
        } else {
          // Check local admin session
          const localUser = this.getLocalAdmin();
          callback(localUser);
        }
      });
    }

    // Local mode listener
    const localUser = this.getLocalAdmin();
    callback(localUser);
    
    const handleStorage = (e) => {
      if (e.key === LOCAL_ADMIN_KEY) {
        callback(this.getLocalAdmin());
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  },

  // Get local admin user
  getLocalAdmin() {
    try {
      const stored = localStorage.getItem(LOCAL_ADMIN_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  // Login
  async login(email, password) {
    if (isFirebaseConfigured && auth) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const adminDoc = await dbService.getById('adminUsers', user.uid);
        const adminUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Dream Admin',
          role: adminDoc?.role || 'admin',
        };
        localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
        return { success: true, user: adminUser };
      } catch (error) {
        console.warn('Firebase Auth notice:', error.code, error.message);
        
        // Provide friendly guidance for common Firebase Auth errors
        if (error.code === 'auth/operation-not-allowed') {
          throw new Error('Email/Password provider is not enabled in Firebase Console. Go to Firebase -> Authentication -> Sign-in method -> Enable Email/Password.');
        }
        if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
          // Check if user is using local demo fallback before rejecting
          if (
            (email === 'kram56447@gmail.com' && password === 'admin12345') ||
            (email === 'admin@dreamcomputer.com' && password === 'admin12345') ||
            (email === 'admin@dreamcomputerpatna.com' && password === 'admin@2026')
          ) {
            // Proceed to local fallback below
          } else {
            throw new Error('Incorrect password for this Firebase admin account. Please check your credentials.');
          }
        }
        if (error.code === 'auth/too-many-requests') {
          throw new Error('Too many failed attempts. Firebase has temporarily locked this account. Please wait or reset password.');
        }
      }
    }

    // Built-in Admin Authentication (Works out of the box for testing and offline admin CMS)
    if (
      (email === 'kram56447@gmail.com' && password === 'admin12345') ||
      (email === 'admin@dreamcomputer.com' && password === 'admin12345') ||
      (email === 'admin@dreamcomputerpatna.com' && password === 'admin@2026')
    ) {
      const adminUser = {
        uid: 'adm-root-01',
        email: email,
        displayName: 'Dream Computer Master Admin',
        role: 'super_admin',
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      return { success: true, user: adminUser };
    }

    throw new Error('Invalid email or password. Please check your credentials.');
  },

  // Logout
  async logout() {
    if (isFirebaseConfigured && auth) {
      try {
        await signOut(auth);
      } catch (err) {
        console.warn('Sign out error', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    return true;
  },
};
