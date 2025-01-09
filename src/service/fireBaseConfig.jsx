// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDty2NwBNkLAHYfnXsjUEfgJ8bOBeXxXhc",
  authDomain: "ai-trip-planner-f16cf.firebaseapp.com",
  projectId: "ai-trip-planner-f16cf",
  storageBucket: "ai-trip-planner-f16cf.firebasestorage.app",
  messagingSenderId: "1058983576811",
  appId: "1:1058983576811:web:c884ec245cd9803b7a2aae",
  measurementId: "G-41XHL2MXP2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
//const analytics = getAnalytics(app);