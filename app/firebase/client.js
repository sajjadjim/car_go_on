import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyAB6KdNNKT-C_Vi9yLl9V6QYumcvYTV5OE',
  authDomain: "car-go-on.firebaseapp.com",
  projectId: "car-go-on",
  storageBucket: "car-go-on.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456",
};

// Ensure no duplicate initialization
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
