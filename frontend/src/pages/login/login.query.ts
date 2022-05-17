import { gql } from "@apollo/client";

export const LOGIN = gql`
  query login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        firstName
        id
        lastName
        username
      }
    }
  }
`;
