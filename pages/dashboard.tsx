import React from "react";
import Header from "../components/Header/Header";

interface Props {
  logout: () => void;
  user: User;
}

const Dashboard: React.FC<Props> = ({ logout, user }) => {
  console.log(user);
  return (
    <>
      <Header
        logout={logout}
        username={user.username}
        profileImage={user.profileImage}
      />
    </>
  );
};

export default Dashboard;
