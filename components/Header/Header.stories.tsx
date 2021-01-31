import React from "react";
import Header from "./Header";
import "../../styles/globals.css";

export default {
  component: Header,
  title: "대시보드 헤더",
};

const Template = (args) => (
  <Header
    username="read0more"
    profileImage="https://avatars.githubusercontent.com/u/21351836?s=460&v=4"
  />
);

export const Default = Template.bind({});
