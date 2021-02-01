import React from "react";
import { userRepository } from "../../apollo/__generated__/userRepository";
import RepositoryItem from "../RepositoryItem/RepositoryItem";
import styles from "./RepositoryList.module.css";

interface Props {
  userRepositories?: userRepository[];
}

const RepositoryList: React.FC<Props> = ({ userRepositories }) => {
  return (
    <ul className={styles.list}>
      {userRepositories.map((userRepository) => (
        <RepositoryItem
          key={userRepository.repository.id}
          userRepository={userRepository}
        />
      ))}
    </ul>
  );
};

export default RepositoryList;
