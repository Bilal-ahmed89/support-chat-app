// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, set, ref} from "firebase/database";
import { getFirestore } from "firebase/firestore"; // Correct import for Firestore
import { createRoutesFromElements } from 'react-router-dom';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDk-55sZYedb1oCHtgWQ2pynoNT-fvifjw",
  authDomain: "support-app-afbef.firebaseapp.com",
  projectId: "support-app-afbef",
  storageBucket: "support-app-afbef.firebasestorage.app", // Corrected storageBucket URL
  messagingSenderId: "496465543737",
  appId: "1:496465543737:web:c12ed38b809a6d82afc3e8",
  measurementId: "G-90PSE6S4KC",
  databaseURL: "https://support-app-afbef-default-rtdb.firebaseio.com/",

};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// export function writeUserData(userId, name, subject, message) {
//     const db = getDatabase();
//     const reference = ref(db, 'requests/' + userId);

//     set(reference, {
//         username: name,
//         subject: subject,
//         message: message,
//     });
// }
export const auth = getAuth(app)
const analytics = getAnalytics(app);
// export const db = getFirestore(app); // Firestore
// export const database = getDatabase(app); // Realtime Database
