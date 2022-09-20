// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ9iYWpnDfVIGmcrNprrsjQBZrWhQfn1w",
  authDomain: "cruproyecto.firebaseapp.com",
  projectId: "cruproyecto",
  storageBucket: "cruproyecto.appspot.com",
  messagingSenderId: "576040436306",
  appId: "1:576040436306:web:a7e5b2843a3ff0b421958b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default {
  firebase,
  db
};