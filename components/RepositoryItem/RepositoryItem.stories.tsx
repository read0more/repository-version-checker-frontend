import React from "react";
import RepositoryItem from "./RepositoryItem";
import "../../styles/globals.css";
import {
  userRepository,
  userRepository_repository_versions,
} from "../../apollo/__generated__/userRepository";
import { ToastProvider } from "react-toast-notifications";

export default {
  component: RepositoryItem,
  title: "레파지토리 아이템",
  decorators: [
    (Story) => (
      <ToastProvider autoDismissTimeout={2000} placement={"top-left"}>
        <Story />
      </ToastProvider>
    ),
  ],
};

let versions: userRepository_repository_versions[] = Array.from(
  Array(10).keys()
)
  .slice(1)
  .reverse()
  .map((i) => ({
    __typename: "RepositoryVersion",
    id: `${i}`,
    prerelease: false,
    publishedAt: `2020-10-26T0${i}:39:54.000Z`,
    url: `https://github.com/read0more/repository-version-checker-frontend/v14.${i}.0`,
  }));

versions = [
  {
    __typename: "RepositoryVersion",
    id: "0",
    prerelease: true,
    publishedAt: `2020-10-26T10:39:54.000Z`,
    url:
      "https://github.com/read0more/repository-version-checker-frontend/v14.10.0",
  },
  ...versions,
];

const defaultArgs: userRepository = {
  __typename: "UserRepository",
  id: "1",
  repositoryUrl:
    "https://github.com/read0more/repository-version-checker-frontend",
  repository: {
    __typename: "Repository",
    id: "1",
    name: "test",
    updatedAt: "2020-10-26T16:39:54.000Z",
    versions,
  },
};

const Template = (args) => <RepositoryItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  userRepository: defaultArgs,
};
