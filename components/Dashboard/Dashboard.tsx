import React, { memo } from "react";
import { Me_me } from "../../apollo/schemaTypes";
import AddRepositoryForm from "../AddRepositoryForm/AddRepositoryForm";
import Header from "../Header/Header";
import RepositoryList from "../RepositoryList/RepositoryList";
import styles from "./Dashboard.module.css";

interface Props {
  me: Me_me;
  logout: () => void;
}

const Dashboard = memo<Props>(({ me, logout }) => (
  <main className={styles.main}>
    <Header
      logout={logout}
      username={me.username}
      profileImage={me.profileImage}
    />
    <section className={styles.section}>
      <AddRepositoryForm />
      <RepositoryList userRepositories={me.repositories} />
    </section>
  </main>
));

export default Dashboard;
