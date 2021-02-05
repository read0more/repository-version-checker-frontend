import { gql } from "@apollo/client";
import { FRAGMENT_USER_REPOSITORY } from "./fragment";

export const CREATE_USER_REPOSITORY = gql`
  mutation CreateUserRepository(
    $createUserRepositoryInput: CreateUserRepositoryInput!
  ) {
    createUserRepository(
      createUserRepositoryInput: $createUserRepositoryInput
    ) {
      ...userRepository
    }
  }
  ${FRAGMENT_USER_REPOSITORY}
`;

export const REMOVE_USER_REPOSITORY = gql`
  mutation RemoveUserRepository($id: Int!) {
    removeUserRepository(id: $id) {
      repositoryUrl
    }
  }
`;
