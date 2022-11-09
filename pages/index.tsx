import { app2 } from "../hooks/firebase"
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "next/router"

export default function Home() {

const router = useRouter()
const auth = getAuth(app2)
const handleLogout = async () => {
  await signOut(auth)
  await router.push("/signup")
}

  return(
    <button onClick = {handleLogout}>ログアウト</button>
  )

}