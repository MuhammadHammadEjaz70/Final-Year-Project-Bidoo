import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyASQFTs4kWO_TEqh2XCy-YhXJ0-VvdIxQM",
  authDomain: "bidoo-7013.firebaseapp.com",
  projectId: "bidoo-7013",
  storageBucket: "bidoo-7013.appspot.com",
  messagingSenderId: "687768358761",
  appId: "1:687768358761:web:a0d71d8430f640e64537f8",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth=getAuth()