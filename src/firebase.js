// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAGStBf5EX96zn4dV_BEWJQyrHzCN9uG2A",
  authDomain: "svelte-crud-95ce2.firebaseapp.com",
  projectId: "svelte-crud-95ce2",
  storageBucket: "svelte-crud-95ce2.appspot.com",
  messagingSenderId: "894352704897",
  appId: "1:894352704897:web:74dfe0b8af0bcb375ed480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);