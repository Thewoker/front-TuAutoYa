import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyCIi0IyQbFu-5S_Ak0H3fSTl6GMCYlzFL8",
  authDomain: "tuautoya-43f02.firebaseapp.com",
  projectId: "tuautoya-43f02",
  storageBucket: "tuautoya-43f02.firebasestorage.app",
  messagingSenderId: "822543021709",
 appId: "1:822543021709:web:3c03236fdc77170f07d4c4",
  measurementId: "G-VBSWW48DV2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {  signInWithPopup }

