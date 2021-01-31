import React, { useRef } from "react";
import styles from "./AddRepositoryForm.module.css";

interface Props {
  handleSubmit: (repositoryUrl: string) => void;
}

const AddRepositoryForm: React.FC<Props> = ({ handleSubmit }) => {
  const inputEl = useRef<HTMLInputElement>();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(inputEl.current.value);
        inputEl.current.value = "";
      }}
    >
      <input
        type="url"
        ref={inputEl}
        className={styles.input}
        placeholder="Repository URL을 입력해주세요."
      />
    </form>
  );
};

export default AddRepositoryForm;
