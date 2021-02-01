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
  mutation RemoveUserRepository($repositoryId: Int!) {
    removeUserRepository(repositoryId: $repositoryId) {
      repositoryUrl
    }
  }
`;
