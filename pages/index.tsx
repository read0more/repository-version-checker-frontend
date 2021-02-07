import { GetStaticProps } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoginButton from "../components/LoginButton/LoginButton";
import Dashboard from "../components/Dashboard/Dashboard";
import styles from "./Home.module.css";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { useToasts } from "react-toast-notifications";
import { useLazyQuery } from "@apollo/client";
import { Me } from "../apollo/schemaTypes";
import { ME } from "../apollo/query";

enum LoginState {
  LoggedIn = "logged in",
  Pending = "pending",
  LoggedOut = "logged out",
}

export default function Home({ loginUrl }) {
  const [loginState, setLoginState] = useState<LoginState>(LoginState.Pending);
  const { addToast } = useToasts();
  const [getMe, { data, loading }] = useLazyQuery<Me>(ME, {
    onCompleted() {
      addToast("로그인에 성공하였습니다.", {
        appearance: "success",
        autoDismiss: true,
      });
    },
    onError(error) {
      if (error.message === "Unauthorized") {
        addToast("다시 로그인 해 주세요.", { appearance: "error" });
      } else {
        addToast("로그인에 실패하였습니다.", { appearance: "error" });
      }
      localStorage.removeItem("jwt");
    },
  });

  const logout = useCallback(() => {
    addToast("로그아웃 되었습니다.", {
      appearance: "success",
      autoDismiss: true,
    });
    localStorage.removeItem("jwt");
    setLoginState(LoginState.LoggedOut);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      getMe();
    }
  }, []);

  useEffect(() => {
    if (loading) {
      setLoginState(LoginState.Pending);
    } else if (data) {
      setLoginState(LoginState.LoggedIn);
    } else {
      setLoginState(LoginState.LoggedOut);
    }
  }, [loading]);

  const render = () => {
    if (loginState === LoginState.Pending) {
      return <LoadingSpinner />;
    }

    if (loginState === LoginState.LoggedOut)
      return (
        <main>
          <div className={styles["login-container"]}>
            <LoginButton loginUrl={loginUrl} />
          </div>
        </main>
      );

    return <Dashboard me={data.me} logout={logout} />;
  };

  return (
    <div>
      <Head>
        <title>Repository version checker</title>
      </Head>
      {render()}
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
