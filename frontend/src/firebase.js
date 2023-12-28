import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhTtlmQo_4Hu7BbRxmRwqksmN5Fkh6fWc",
  authDomain: "brill-chat.firebaseapp.com",
  projectId: "brill-chat",
  storageBucket: "brill-chat.appspot.com",
  messagingSenderId: "1064733878795",
  appId: "1:1064733878795:web:d27baf1f70a0c995cd750e",
  measurementId: "G-DL4465MZNS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore();
const analytics = getAnalytics(app);
