import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDthO9GqJRaLnvCAts_ztMecXvYoD2VCT4",
  authDomain: "chatsupport-ade96.firebaseapp.com",
  projectId: "chatsupport-ade96",
  storageBucket: "chatsupport-ade96.firebasestorage.app",
  messagingSenderId: "366876627522",
  appId: "1:366876627522:web:4c61ea3344083caaa553db",
  measurementId: "G-3LZ85QGD85",
  databaseURL: "https://chatsupport-ade96-default-rtdb.firebaseio.com/"
};


export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
