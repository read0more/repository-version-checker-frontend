import React, { memo } from "react";
import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = memo(() => (
  <div className={styles.container}>
    <div className={styles.spinner}></div>
  </div>
));

export default LoadingSpinner;
