import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {


  apiKey: "AIzaSyBTLGOVnxxOC5JOEeHuFnJLxjJa6wGhuZ0",

  authDomain: "auth-user-f8c65.firebaseapp.com",

  projectId: "auth-user-f8c65",

  storageBucket: "auth-user-f8c65.firebasestorage.app",

  messagingSenderId: "995627538196",

  appId: "1:995627538196:web:9057bd5e7cfe120f135401",

  measurementId: "G-NDEEEW80NR"


};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export {  signInWithPopup }

