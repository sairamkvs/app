// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyuqxGtZI2ruaiNp7arYW7UItWS8ACtx8",
  authDomain: "app-project-f5aa7.firebaseapp.com",
  projectId: "app-project-f5aa7",
  storageBucket: "app-project-f5aa7.appspot.com",
  messagingSenderId: "375525822996",
  appId: "1:375525822996:web:0895543dbcf3cc0b9e0d01",
  measurementId: "G-058VLQWWQ6"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore(); // Correctly initialize Firestore
const auth = firebaseApp.auth();

export { auth, db }; // Export Firestore instance