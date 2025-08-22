// app/firebase/client.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// (Optionally move these to env vars for security in CI)
const firebaseConfig = {
  apiKey: "AIzaSyAB6KdNNKT-C_Vi9yLl9V6QYumcvYTV5OE",
  authDomain: "car-go-on.firebaseapp.com",
  projectId: "car-go-on",
  storageBucket: "car-go-on.firebasestorage.app",
  messagingSenderId: "364584407286",
  appId: "1:364584407286:web:783997e2e8a609ef0f1cd7",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
