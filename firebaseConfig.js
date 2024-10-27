// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCz-Aexc6KZQ0goA01zPcY1hgNRA7KRZb8",
  authDomain: "minrabat.firebaseapp.com",
  databaseURL: "https://minrabat-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "minrabat",
  storageBucket: "minrabat.appspot.com",
  messagingSenderId: "885010808818",
  appId: "1:885010808818:web:0fc7a91f4c03be8233f56b",
  measurementId: "G-BLECKQ3QJ4"
};

// Initialize Firebase only once in this file
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
