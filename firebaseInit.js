import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBcJDYf0ZY9JWkqUTegTWSDIq2fsQ1pwwg",
  authDomain: "photofolio-9c7fb.firebaseapp.com",
  projectId: "photofolio-9c7fb",
  storageBucket: "photofolio-9c7fb.appspot.com",
  messagingSenderId: "573855964264",
  appId: "1:573855964264:web:55c09ffcd89e32e1872fdd",
  measurementId: "G-TSLQ2EY7MV",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
