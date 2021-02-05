import { useQuery } from "@apollo/client";
import React, { useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { ME } from "../apollo/query";
import { Me } from "../apollo/__generated__/Me";
import AddRepositoryForm from "../components/AddRepositoryForm/AddRepositoryForm";
import Header from "../components/Header/Header";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import RepositoryList from "../components/RepositoryList/RepositoryList";
import styles from "./Dashboard.module.css";
import { useRouter } from "next/router";

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
  });

  // useQuery의 options에 있는 onError 이용하려고 했으나 문제가 있는것으로 보여 직접 체크하게 변경
  // https://github.com/apollographql/apollo-client/issues/5708
  if (error) {
    if (error.message === "Unauthorized") {
      addToast("다시 로그인 해 주세요.", { appearance: "error" });
    } else {
      addToast("로그인에 실패하였습니다.", { appearance: "error" });
    }
    localStorage.removeItem("jwt");
    router.push("/");
  }

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
      )}
    </>
  );
};

export default Dashboard;
