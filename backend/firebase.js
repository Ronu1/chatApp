const {initializeApp} =require("firebase/app")
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCTBDN95n64VYab_RHwBKAUjViDSOTWFbU",
  authDomain: "chatapp-fb800.firebaseapp.com",
  projectId: "chatapp-fb800",
  storageBucket: "chatapp-fb800.appspot.com",
  messagingSenderId: "52195894523",
  appId: "1:52195894523:web:227ab9272283863324fc5e",
  measurementId: "G-JK9B8RXVZJ",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const storage = getStorage();
 const db = getFirestore();
// const analytics = getAnalytics(app);

module.exports = {app,auth,storage,db};
