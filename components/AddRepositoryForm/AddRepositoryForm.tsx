import { useMutation } from "@apollo/client";
import React, { useCallback, useRef } from "react";
import { CREATE_USER_REPOSITORY } from "../../apollo/mutation";
import { ME } from "../../apollo/query";
import { Me } from "../../apollo/__generated__/Me";
import styles from "./AddRepositoryForm.module.css";

const AddRepositoryForm = () => {
  const inputEl = useRef<HTMLInputElement>();
  const [createUserRepository, { loading }] = useMutation(
    CREATE_USER_REPOSITORY,
    {
      update(cache, { data }) {
        const newUserRepository = data?.createUserRepository;
        const existingMe = cache.readQuery<Me>({
          query: ME,
        });

        if (existingMe && newUserRepository) {
          const newRepositories = [
            ...existingMe.me.repositories,
            newUserRepository,
          ];

          cache.writeQuery({
            query: ME,
            data: {
              me: { ...existingMe.me, repositories: newRepositories },
            },
          });
        }
      },
    }
  );

  const handleSubmit = useCallback((event) => {
    event.preventDefault();
    if (loading) return;

    createUserRepository({
      variables: {
        createUserRepositoryInput: {
          repositoryUrl: inputEl.current.value,
        },
      },
    });

    inputEl.current.value = "";
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="url"
        ref={inputEl}
        className={styles.input}
        placeholder="Repository URL을 입력해주세요."
        disabled={loading}
      />
    </form>
  );
};

export default AddRepositoryForm;
