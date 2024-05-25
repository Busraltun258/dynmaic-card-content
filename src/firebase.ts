import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBORQDt01c8kKaUDcyPl-EL6iQYMJJm8Kk",
  authDomain: "case-32d41.firebaseapp.com",
  projectId: "case-32d41",
  storageBucket: "case-32d41.appspot.com",
  messagingSenderId: "72824900371",
  appId: "1:72824900371:web:b4f1091253fcbc966728e6",
  measurementId: "G-C910LQRB6G"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };