import gql from 'graphql-tag';

const createAccountMutation = gql`
  mutation CreateAnAccount($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createAnAccount(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      success
      id
      firstName
      lastName
      email
    }
  }
`;

export default createAccountMutation;
