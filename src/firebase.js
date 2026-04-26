import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9DEVn9lVM_oXAPF9oxoL2vpi7Qk1n0I0",
  authDomain: "vid-tube-23854.firebaseapp.com",
  projectId: "vid-tube-23854",
  storageBucket: "vid-tube-23854.firebasestorage.app",
  messagingSenderId: "862664268824",
  appId: "1:862664268824:web:685d48a45d9415549df76d",
  measurementId: "G-Q1HY4QCQ3D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
