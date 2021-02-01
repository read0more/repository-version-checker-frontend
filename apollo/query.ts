import { FRAGMENT_USER_REPOSITORY } from "./fragment";
import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      id
      githubId
      username
      profileImage
      repositories {
        ...userRepository
      }
    }
  }
  ${FRAGMENT_USER_REPOSITORY}
`;
