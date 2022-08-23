// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHlWupaN6uF3OPgTkA3l-40DzQhchzWfs",
  authDomain: "kimmytwitter-8155f.firebaseapp.com",
  projectId: "kimmytwitter-8155f",
  storageBucket: "kimmytwitter-8155f.appspot.com",
  messagingSenderId: "646869707340",
  appId: "1:646869707340:web:ce0d1fbcd432e43c2622e9",
  measurementId: "G-662864CVTM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export default app;