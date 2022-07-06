// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByfd3N01DMchSnWZT3dIoHyBZY83d41SI",
  authDomain: "vishaaxl-invoice-app.firebaseapp.com",
  projectId: "vishaaxl-invoice-app",
  storageBucket: "vishaaxl-invoice-app.appspot.com",
  messagingSenderId: "611781970237",
  appId: "1:611781970237:web:2a8b5923dc966672db1d54",
  measurementId: "G-X2178G15C4",
};

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const database = getFirestore(app);
