import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { useState } from "react";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTxQyQpkpPjQVCajjqfc5ESPrTvHj7s-o",
  authDomain: "todo-calender-26a81.firebaseapp.com",
  databaseURL: "https://todo-calender-26a81-default-rtdb.firebaseio.com",
  projectId: "todo-calender-26a81",
  storageBucket: "todo-calender-26a81.appspot.com",
  messagingSenderId: "576919475576",
  appId: "1:576919475576:web:60ade936ad8f480570648d",
  measurementId: "G-BEFRSDW1SK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export function useAuth() {
  return auth;
}

export function useUser() {
  const [user, setUser] = useState<User>();
  onAuthStateChanged(auth, (user) => {
    if (user) setUser(user);
  });
  return user;
}

export { app, auth, db }