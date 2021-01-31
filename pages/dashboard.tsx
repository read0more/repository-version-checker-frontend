import React from "react";
import AddRepositoryForm from "../components/AddRepositoryForm/AddRepositoryForm";
import Header from "../components/Header/Header";

interface Props {
  handleSubmit: (repositoryUrl: string) => void;
  logout: () => void;
  user: User;
}

const Dashboard: React.FC<Props> = ({ handleSubmit, logout, user }) => {
  return (
    <>
      <Header
        logout={logout}
        username={user.username}
        profileImage={user.profileImage}
      />
      <AddRepositoryForm handleSubmit={handleSubmit} />
    </>
  );
};

export default Dashboard;
