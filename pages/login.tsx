import { useEffect } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.jwt) {
      localStorage.setItem("jwt", router.query.jwt as string);
    }
    router.push("/");
  });

  return <LoadingSpinner />;
}
