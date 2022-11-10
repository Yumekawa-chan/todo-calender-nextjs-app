import Link from "next/link";

const index = () => {
  return (
    <div>
      <p className="text-6xl font-bold text-center ">Home</p>
      <Link href = "/signin" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center">Signin</Link>
      <br />
      <Link href = "/signup" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center">Signup</Link>
    </div>
  );
}

export default index;