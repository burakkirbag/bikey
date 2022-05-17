import {
  gql,
  OperationVariables,
  QueryHookOptions,
  useQuery,
} from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      username
      firstName
      lastName
    }
  }
`;

export const useCurrentUserQuery = (
  options: QueryHookOptions<any, OperationVariables>
) => useQuery(GET_CURRENT_USER, options);
