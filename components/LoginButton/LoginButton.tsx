import React from "react";
import styles from "./LoginButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

const LoginButton = (props) => (
  <a href="http://localhost:3000/auth/github/login">
    <button type="button" className={styles.button}>
      <div className={styles["scale-box"]}>
        <b className={styles.text}>로그인</b>
        <FontAwesomeIcon icon={faGithub} className={styles.logo} />
      </div>
    </button>
  </a>
);

export default LoginButton;
