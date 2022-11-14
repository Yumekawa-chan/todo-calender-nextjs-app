import Link from "next/link";
import { Spacer } from "@nextui-org/react"

const index = () => {
  return (
    <div className="text-center">
      <p className="text-6xl font-bold text-center ">Home</p>
      <Spacer y={2} />
      <Link href = "/signin" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center">Signin</Link>
      <Spacer y={2} />
      <Link href = "/signup" className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded text-center">Signup</Link>
    </div>
  );
}

export default index;