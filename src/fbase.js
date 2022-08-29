// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

 
const firebaseConfig = {
  apiKey: "AIzaSyCHlWupaN6uF3OPgTkA3l-40DzQhchzWfs",
  authDomain: "kimmytwitter-8155f.firebaseapp.com",
  projectId: "kimmytwitter-8155f",
  storageBucket: "kimmytwitter-8155f.appspot.com",
  messagingSenderId: "646869707340",
  appId: "1:646869707340:web:ce0d1fbcd432e43c2622e9",
  measurementId: "G-662864CVTM"
};

console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const authService = getAuth(app);

export const firebaseInstance = app;
export default authService;
export const dbService = getFirestore();
