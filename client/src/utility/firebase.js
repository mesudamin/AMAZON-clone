import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

/**
 * Firebase Web App Configuration
 * Reads from Vite environment variables (VITE_FIREBASE_*) with project fallbacks
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBUq_TXYd-N1WNws5qafueDftN-U7PNV0Q',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'clone-dbd10.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'clone-dbd10',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'clone-dbd10.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '84362440409',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:84362440409:web:47c251cee1ea4bc64d58c8'
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig)

// Initialize and export Firebase Authentication and Firestore instances
export const auth = getAuth(app)
export const db = getFirestore(app)
export default app

