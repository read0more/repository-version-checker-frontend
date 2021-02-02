import React from "react";
import RepositoryList from "./RepositoryList";
import "../../styles/globals.css";
import * as RepositoryItemStories from "../RepositoryItem/RepositoryItem.stories";
import { userRepository_repository } from "../../apollo/__generated__/userRepository";
import { ToastProvider } from "react-toast-notifications";

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

console.log(userRepositories);

export const Default = Template.bind({});
Default.args = {
  userRepositories,
};
