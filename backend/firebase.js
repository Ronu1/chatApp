const {initializeApp} =require("firebase/app")
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const { getFirestore } = require("firebase/firestore");

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
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 const storage = getStorage();
 const db = getFirestore();
// const analytics = getAnalytics(app);

module.exports = {app,auth,storage,db};
