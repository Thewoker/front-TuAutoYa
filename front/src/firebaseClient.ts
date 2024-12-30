import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBTLGOVnxxOC5JOEeHuFnJLxjJa6wGhuZ0",
    authDomain: "auth-user-f8c65.firebaseapp.com",
    projectId: "auth-user-f8c65",
    storageBucket: "auth-user-f8c65.firebasestorage.app",
    messagingSenderId: "995627538196",
    appId: "1:995627538196:web:9057bd5e7cfe120f135401",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const login = async (email: string, password: string): Promise<void> => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();

        const response = await fetch("http://localhost:3000/secure-data", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
    }
};

export default login;
