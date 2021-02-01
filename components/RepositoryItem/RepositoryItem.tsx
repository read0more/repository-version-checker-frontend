import React, { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./RepositoryItem.module.css";
import Link from "next/link";
import { format } from "date-fns";
import { userRepository as userRepositoryInterface } from "../../apollo/__generated__/userRepository";
import { useMutation } from "@apollo/client";
import { REMOVE_USER_REPOSITORY } from "../../apollo/mutation";
import { ME } from "../../apollo/query";
import { Me } from "../../apollo/__generated__/Me";

interface Props {
  userRepository: userRepositoryInterface;
}

const RepositoryItem: React.FC<Props> = ({ userRepository }) => {
  const [removeUserRepository] = useMutation(REMOVE_USER_REPOSITORY, {
    update(cache, { data }) {
      const removedRepositoryUrl = data?.removeUserRepository.repositoryUrl;
      const existingMe = cache.readQuery<Me>({
        query: ME,
      });

      if (existingMe && removedRepositoryUrl) {
        const test = cache.identify({
          id: userRepository.repository.id,
          __typename: "Repository",
        });
        cache.evict({ id: test });
      }
    },
  });

  const handleClick = useCallback(() => {
    removeUserRepository({
      variables: {
        repositoryId: +userRepository.repository.id,
      },
    });
  }, []);

  return (
    <li className={styles.repository}>
      <div className={styles["title-box"]}>
        <b>{userRepository.repository.name}</b>
        <div>
          <Link href={userRepository.repositoryUrl}>
            <a target="_blank" rel="noopener noreferer">
              <FontAwesomeIcon icon={faGithub} className={styles.logo} />
            </a>
          </Link>
          <FontAwesomeIcon
            icon={faTimes}
            className={styles.times}
            onClick={handleClick}
          />
        </div>
      </div>
      <ol className={styles.list}>
        {userRepository.repository.versions.map((version) => (
          <li key={version.id}>
            <div className={styles.item}>
              <b className={styles.version}>{version.url.split("/").pop()}</b>
              <b className={styles.date}>
                {format(new Date(version.publishedAt), "yyyy/LL/dd HH:mm:ss")}
              </b>
              <b className={styles.prerelease}>
                {version.prerelease ? "prerelease" : ""}
              </b>
              <div className={styles["logo-box"]}>
                <Link href={version.url}>
                  <a
                    className={styles.logo}
                    target="_blank"
                    rel="noopener noreferer"
                  >
                    <FontAwesomeIcon icon={faGithub} />
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </li>
  );
};

export default RepositoryItem;
