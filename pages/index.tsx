import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Repository version checker</title>
      </Head>

      <main className={styles.main}>
        <a href="http://localhost:3000/auth/github/login">로그인</a>
        <a href="http://localhost:3000/auth/logout">로그아웃</a>
      </main>
    </div>
  );
}
