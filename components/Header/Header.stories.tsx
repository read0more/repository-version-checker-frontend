import React from "react";
import Header from "./Header";
import "../../styles/globals.css";
import styles from "../../pages/Home.module.css";

export default {
  component: Header,
  title: "대시보드 헤더",
};

const Template = () => (
  <div className={styles.container}>
    <main className={styles.main}>
      <Header
        logout={() => {}}
        username="read0more"
        profileImage="https://avatars.githubusercontent.com/u/21351836?s=460&v=4"
      />
    </main>
  </div>
);

export const Default = Template.bind({});
