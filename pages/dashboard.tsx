import { useQuery } from "@apollo/client";
import React, { useCallback, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import { ME } from "../apollo/query";
import AddRepositoryForm from "../components/AddRepositoryForm/AddRepositoryForm";
import Header from "../components/Header/Header";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import RepositoryList from "../components/RepositoryList/RepositoryList";
import styles from "./Dashboard.module.css";
import { useRouter } from "next/router";
import { Me } from "../apollo/schemaTypes";

const Dashboard = () => {
  const router = useRouter();
  const { addToast } = useToasts();
  const { loading, data, error } = useQuery<Me>(ME, {
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
        console.log(error);
        addToast("로그인에 실패하였습니다.", { appearance: "error" });
      }
      localStorage.removeItem("jwt");
      router.push("/");
    },
  });

  const logout = useCallback(() => {
    addToast("로그아웃 되었습니다.", {
      appearance: "success",
      autoDismiss: true,
    });
    localStorage.removeItem("jwt");
    router.push("/");
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        !error && (
          <main className={styles.main}>
            <Header
              logout={logout}
              username={data.me.username}
              profileImage={data.me.profileImage}
            />
            <section className={styles.section}>
              <AddRepositoryForm />
              <RepositoryList userRepositories={data.me.repositories} />
            </section>
          </main>
        )
      )}
    </>
  );
};

export default Dashboard;
