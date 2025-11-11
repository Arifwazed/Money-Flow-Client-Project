// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAY8sjv1Wtl1Z8GcULxpeuTF5Hul0zuFiM",
  authDomain: "money-flow-bc928.firebaseapp.com",
  projectId: "money-flow-bc928",
  storageBucket: "money-flow-bc928.firebasestorage.app",
  messagingSenderId: "542224084223",
  appId: "1:542224084223:web:69b052ebdfd47711e0b0ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);