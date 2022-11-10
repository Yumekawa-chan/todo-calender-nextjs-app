import Link from "next/link";

const index = () => {
  return (
    <div>
      <p>Home</p>
      <Link href = "/signin">Signin</Link>
      <br />
      <Link href = "/signup">Signup</Link>
    </div>
  );
}

export default index;