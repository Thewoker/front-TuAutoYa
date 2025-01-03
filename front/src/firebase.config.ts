import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_BACKEND_API}`,

  authDomain: `${process.env.NEXT_PUBLIC_DOMAIN_API}`,

  projectId: `${process.env.NEXT_PUBLIC_PROYECT_ID_API}`,

  storageBucket: `${process.env.NEXT_PUBLIC_STORAGE_API}`,

  messagingSenderId: `${process.env.NEXT_PUBLIC_MESSAGE_API}`,

  appId: `${process.env.NEXT_PUBLIC_APP_ID}`,

  measurementId: `${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {  signInWithPopup }
