import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyBs8qtGECJGGLbNL7P4mncW6ul5GeTbjkg",
  
    authDomain: "donation-kyc.firebaseapp.com",
  
    projectId: "donation-kyc",
  
    storageBucket: "donation-kyc.firebasestorage.app",
  
    messagingSenderId: "606957402755",
  
    appId: "1:606957402755:web:65ba46d71f85cd241b39b6",
  
    measurementId: "G-LKSQ9SNYL7"
  
  };
// Initialize Firebase  

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);