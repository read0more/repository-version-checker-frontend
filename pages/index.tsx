import { useQuery } from "@apollo/client";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback } from "react";
import { ME } from "../apollo/query";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import LoginButton from "../components/LoginButton/LoginButton";
import Dashboard from "./dashboard";
import styles from "./Home.module.css";
import { Me } from "../apollo/__generated__/Me";
import { useToasts } from "react-toast-notifications";

export default function Home({ loginUrl }) {
  const { addToast } = useToasts();
  const { loading, error, data, refetch } = useQuery<Me>(ME, {
    onCompleted(data: Me) {
      addToast("로그인에 성공하였습니다.", {
        appearance: "success",
        autoDismiss: true,
      });
    },
    onError({ message }) {
      addToast(message, { appearance: "error" });
    },
  });

  const logout = useCallback(() => {
    localStorage.removeItem("jwt");
    refetch();
  }, []);

  const render = () => {
    if (loading) return <LoadingSpinner />;

    if (data && !error) return <Dashboard logout={logout} user={data.me} />;

    return (
      <div className={styles["login-container"]}>
        <LoginButton loginUrl={loginUrl} />
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main className={styles.main}>{render()}</main>
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
