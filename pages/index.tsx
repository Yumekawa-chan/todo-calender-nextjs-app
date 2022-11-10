import { app2 } from "../hooks/firebase"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react";
import { useNavigate, Navigate, NavigateFunction } from "react-router-dom";

export default function Home() {

  // 表示名
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const router = useRouter()
  const auth = getAuth(app2)
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/login")
  }

  if (user !== null){
    return(
      <>
        <h1>マイページ</h1>
        <p>{user && user.email}</p>
        <button onClick = {handleLogout}>ログアウト</button>
      </>
    )
  }else{
    navigate("/login")
  }
}