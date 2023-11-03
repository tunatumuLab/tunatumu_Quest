// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore"
import { initializeAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLPa1mp83Sl4wKHzvD3S_fmgyC0Zbo4zw",
  authDomain: "gakugaku-quest.firebaseapp.com",
  projectId: "gakugaku-quest",
  storageBucket: "gakugaku-quest.appspot.com",
  messagingSenderId: "550000132915",
  appId: "1:550000132915:web:68a021c99c058e1fbdf446"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = initializeFirestore(app, {});
const auth = initializeAuth(app)

export {app, firestore, auth}