import React, { memo } from "react";
import styles from "./LoginButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

interface Props {
  loginUrl: string;
}

const LoginButton = memo<Props>(({ loginUrl }) => (
  <Link href={loginUrl}>
    <button type="button" className={styles.button}>
      <div className={styles["scale-box"]}>
        <b className={styles.text}>깃허브로 로그인</b>
        <FontAwesomeIcon icon={faGithub} className={styles.logo} />
      </div>
    </button>
  </Link>
));

export default LoginButton;
