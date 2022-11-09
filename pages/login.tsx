import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Home() {

  const doLogin = () => {
    const auth = getAuth();

    // Firebaseに登録したID,PASSWORD
    const email = 'marika.tanoc@gmail.com';
    const password = 'abc123';

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert( 'ログインok!' );
        console.log( user );
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div>
      <h1>ログイン</h1>
      <button onClick={doLogin}>ログインする</button>
    </div>
  )
}