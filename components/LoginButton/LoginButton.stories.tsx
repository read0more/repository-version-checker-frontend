import React from "react";
import LoginButton from "./LoginButton";
import "../../styles/globals.css";

export default {
  component: LoginButton,
  title: "로그인 버튼",
};

const Template = () => <LoginButton loginUrl={""} />;

export const Default = Template.bind({});
