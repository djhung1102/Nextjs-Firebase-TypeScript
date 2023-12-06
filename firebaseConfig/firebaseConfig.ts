import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "abc",
  authDomain: "abc.firebaseapp.com",
  projectId: "abc",
  storageBucket: "acb",
  messagingSenderId: "366",
  appId: "4a16ec",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
