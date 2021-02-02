import React from "react";
import AddRepositoryForm from "./AddRepositoryForm";
import "../../styles/globals.css";
import { ToastProvider } from "react-toast-notifications";

export default {
  component: AddRepositoryForm,
  title: "레파지토리 추가 input form",
  decorators: [
    (Story) => (
      <ToastProvider autoDismissTimeout={2000} placement={"top-left"}>
        <Story />
      </ToastProvider>
    ),
  ],
};

const Template = () => <AddRepositoryForm />;

export const Default = Template.bind({});
