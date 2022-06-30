
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcnq-OUoPLSpLGriOaX8dtHiQ9sS1zhOg",
  authDomain: "reactp2-2761f.firebaseapp.com",
  projectId: "reactp2-2761f",
  storageBucket: "reactp2-2761f.appspot.com",
  messagingSenderId: "1079269350908",
  appId: "1:1079269350908:web:a68c91f95eadcb8019a679"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const database = getFirestore(app);
 export  const  storage = getStorage(app);
 