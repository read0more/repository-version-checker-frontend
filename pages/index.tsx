import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoginButton from "../components/LoginButton/LoginButton";
import styles from "./Home.module.css";

export default function Home({ loginUrl }) {
  const [user, setUser] = useState<User>(null);

  const logout = useCallback(() => setUser(null), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main className={styles.main}>
        <section>{process.env.REACT_APP_GITHUB_LOGIN_URL}</section>
        {user ? <div>대시보드</div> : <LoginButton loginUrl={loginUrl} />}
      </main>
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
