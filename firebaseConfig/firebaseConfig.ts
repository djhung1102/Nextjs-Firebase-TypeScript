import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAg7qzqKnwibNKHtfGQDb8ByIymTxxXFkM",
  authDomain: "fir-blogging-cc0ee.firebaseapp.com",
  projectId: "fir-blogging-cc0ee",
  storageBucket: "fir-blogging-cc0ee.appspot.com",
  messagingSenderId: "366238865285",
  appId: "1:366238865285:web:8dcc0f53fce7f22d4a16ec",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
