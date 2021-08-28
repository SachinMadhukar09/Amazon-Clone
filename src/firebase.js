import firebase from "firebase";
// import * as firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDyRrojB-fhbB5Y7au8uonh3b7P4ZT_Hjo",
  authDomain: "clone-aadf7.firebaseapp.com",
  projectId: "clone-aadf7",
  storageBucket: "clone-aadf7.appspot.com",
  messagingSenderId: "756007236837",
  appId: "1:756007236837:web:9548cda1439459c8d8900c",
  measurementId: "G-WRCDTZ1WY5",
};

const firebaseApp = firebase.intializeApp({firebaseConfig});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };
