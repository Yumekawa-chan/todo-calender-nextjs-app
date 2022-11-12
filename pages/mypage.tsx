import { app } from "../hooks/firebase"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import React, { useState, useEffect } from "react"
import Calender from "./Calender"

export default function mypage() {

  // 表示名
  const [user, setUser] = useState();
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const router = useRouter()
  const auth = getAuth(app)

  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/")
  }

  const redirect = async (pagename:string) => {
    await router.push(pagename)
  }


  if (user !== null){
    return(
      <>
        <h1>Mypage</h1>
        <p>{user && user.email}</p>
        <button onClick = {handleLogout}>Signout</button>
        <Calender />
      </>
    )
  }else{
    redirect('/signin')
  }
}

