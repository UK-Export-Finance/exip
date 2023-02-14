import gql from 'graphql-tag';

const getByEmailQuery = gql`
  query GetAccountByEmail($email: String!) {
    getAccountByEmail(email: $email) {
      id
      email
    }
  }
`;

export default getByEmailQuery;
