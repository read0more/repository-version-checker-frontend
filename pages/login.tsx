import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.jwt) {
      localStorage.setItem("jwt", router.query.jwt as string);
    }
    router.push("/");
  });

  return <div>로그인 중 입니다.</div>;
}
