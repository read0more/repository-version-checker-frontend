import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import LoginButton from "../components/LoginButton/LoginButton";
import styles from "./Home.module.css";

export default function Home() {
  const [user, setUser] = useState<User>(null);

  const logout = useCallback(() => setUser(null), []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main className={styles.main}>
        {user ? <div>대시보드</div> : <LoginButton />}
      </main>
    </div>
  );
}
