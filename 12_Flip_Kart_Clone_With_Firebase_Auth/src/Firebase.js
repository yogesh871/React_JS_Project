import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyB-awp3F8clS4o414Tfw-3HZkVWAu_1MiQ",
  authDomain: "flipkart-clone-80920.firebaseapp.com",
  projectId: "flipkart-clone-80920",
  storageBucket: "flipkart-clone-80920.appspot.com",
  messagingSenderId: "481081719497",
  appId: "1:481081719497:web:1b0ba10fb502dddc816b18",
  measurementId: "G-9S0Q94V2C4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

