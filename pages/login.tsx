import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import Home from ".";
import { GetStaticProps } from "next";

export default function Login({ loginUrl }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (router.query.jwt) {
      window.history.pushState({}, null, "/");
      localStorage.setItem("jwt", router.query.jwt as string);
      setLoading(false);
    }
  }, [router]);

  return loading ? <LoadingSpinner /> : <Home loginUrl={loginUrl} />;
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      loginUrl: process.env.GITHUB_LOGIN_URL,
    },
  };
};
