import { gql } from "@apollo/client";

export const FRAGMENT_USER_REPOSITORY = gql`
  fragment userRepository on UserRepository {
    repository {
      id
      name
      updatedAt
      versions {
        id
        prerelease
        url
        publishedAt
      }
    }
    repositoryUrl
  }
`;
