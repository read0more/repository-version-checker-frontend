import React, { memo } from "react";
import styles from "./Header.module.css";

interface Props {
  logout: () => void;
  username: string;
  profileImage: string;
}

const Header = memo<Props>(({ logout, username, profileImage }) => {
  return (
    <header className={styles.header}>
      <figure className={styles.figure}>
        <img src={profileImage} className={styles.profile} alt="profile" />
        <figcaption className={styles.username}>{username}</figcaption>
      </figure>
      <button className={styles.button} onClick={logout}>
        <b>로그아웃</b>
      </button>
    </header>
  );
});

export default Header;
