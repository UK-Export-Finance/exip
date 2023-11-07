import gql from 'graphql-tag';

const getAccountQuery = gql`
  query account($id: ID!) {
    account(where: { id: $id }) {
      id
      email
    }
  }
`;

export default getAccountQuery;
