import gql from 'graphql-tag';

const createAccountMutation = gql`
  mutation createAnAccount($urlOrigin: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createAnAccount(urlOrigin: $urlOrigin, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      success
      id
      alreadyExists
      isVerified
    }
  }
`;

export default createAccountMutation;
