import Link from "next/link";

const index = () => {
  return (
    <div>
      <p>ホーム</p>
      <Link href = "/login">ログイン</Link>
      <br />
      <Link href = "/signup">サインアップ</Link>
    </div>
  );
}

export default index;