// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: 'social-media-245e7.firebaseapp.com',
  projectId: 'social-media-245e7',
  storageBucket: 'social-media-245e7.appspot.com',
  messagingSenderId: '564082903553',
  appId: '1:564082903553:web:6cf99d70193616e9f90e00',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const googleProvider = new GoogleAuthProvider()
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
