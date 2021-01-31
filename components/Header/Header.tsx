import React, { useEffect } from "react";

interface Props {
  logout: () => void;
  username: string;
  profileImage: string;
}

const Header: React.FC<Props> = ({ logout, username, profileImage }) => {
  return (
    <>
      <button onClick={logout}>로그아웃</button>
    </>
  );
};

export default Header;
