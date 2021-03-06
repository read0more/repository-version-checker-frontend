import React from "react";
import RepositoryList from "./RepositoryList";
import "../../styles/globals.css";
import * as RepositoryItemStories from "../RepositoryItem/RepositoryItem.stories";
import { ToastProvider } from "react-toast-notifications";
import { userRepository_repository } from "../../apollo/schemaTypes";

export default {
  component: RepositoryList,
  title: "레파지토리 리스트",
  decorators: [
    (Story) => (
      <ToastProvider autoDismissTimeout={2000} placement={"top-left"}>
        <Story />
      </ToastProvider>
    ),
  ],
};

const Template = (args) => <RepositoryList {...args} />;
const userRepositories = Array.from(Array(6).keys())
  .slice(1)
  .map((i) => {
    const newRepository: userRepository_repository = {
      ...RepositoryItemStories.Default.args.userRepository.repository,
    };
    newRepository.name = `${newRepository.name}${i}`;
    return {
      ...RepositoryItemStories.Default.args.userRepository,
      repository: newRepository,
    };
  });

export const Default = Template.bind({});
Default.args = {
  userRepositories,
};
