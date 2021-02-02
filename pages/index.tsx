import { useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { ME } from "../apollo/query";
import LoginButton from "../components/LoginButton/LoginButton";
import Dashboard from "./dashboard";
import styles from "./Home.module.css";
import { Me } from "../apollo/__generated__/Me";

export default function Home({ loginUrl }) {
  const { loading, error, data, refetch } = useQuery<Me>(ME);

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    refetch();
  }, []);

  return (
    <div>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main>
        {data && !error ? (
          <Dashboard logout={logout} user={data.me} />
        ) : (
          <div className={styles["login-container"]}>
            <LoginButton loginUrl={loginUrl} />
          </div>
        )}
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
