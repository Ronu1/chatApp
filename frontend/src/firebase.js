import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTBDN95n64VYab_RHwBKAUjViDSOTWFbU",
  authDomain: "chatapp-fb800.firebaseapp.com",
  projectId: "chatapp-fb800",
  storageBucket: "chatapp-fb800.appspot.com",
  messagingSenderId: "52195894523",
  appId: "1:52195894523:web:227ab9272283863324fc5e",
  measurementId: "G-JK9B8RXVZJ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);
