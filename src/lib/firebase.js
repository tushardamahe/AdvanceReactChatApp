import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "advancereactchatapp.firebaseapp.com",
  projectId: "advancereactchatapp",
  storageBucket: "advancereactchatapp.appspot.com",
  messagingSenderId: "781926521678",
  appId: "1:781926521678:web:2c92b374bc92889bf35c1f",
};

const app = initializeApp(firebaseConfig);
