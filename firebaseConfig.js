import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"; // Import the database

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-Aexc6KZQ0goA01zPcY1hgNRA7KRZb8",
  authDomain: "minrabat.firebaseapp.com",
  projectId: "minrabat",
  storageBucket: "minrabat.appspot.com",
  messagingSenderId: "885010808818",
  appId: "1:885010808818:web:0fc7a91f4c03be8233f56b",
  measurementId: "G-BLECKQ3QJ4" // Optional, can be removed if not using analytics
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app); // Initialize the database

export { app, database }; // Export app and database for use in other parts of your application
