import { GetStaticProps } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import LoginButton from "../components/LoginButton/LoginButton";
import styles from "./Home.module.css";
import { useRouter } from "next/router";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";

export default function Home({ loginUrl }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Repository version checker</title>
      </Head>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <main>
          <div className={styles["login-container"]}>
            <LoginButton loginUrl={loginUrl} />
          </div>
        </main>
      )}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      loginUrl: process.env.GITHUB_LOGIN_URL,
    },
  };
};
