import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCLET,
  messagingSenderId: process.env.MESSAGENG_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export function useAuth() {
  return auth;
}

export const db = getFirestore();
export const storage = getStorage();

export function useUser() {
  const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
  });
  return user;
}

export const app2 = initializeApp(firebaseConfig)