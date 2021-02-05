import { gql } from "@apollo/client";

export const FRAGMENT_USER_REPOSITORY = gql`
  fragment userRepository on UserRepository {
    id
    repositoryUrl
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
  }
`;
