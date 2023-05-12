import gql from 'graphql-tag';

const accountSignInMutation = gql`
  mutation AccountSignIn($email: String!, $password: String!) {
    accountSignIn(email: $email, password: $password) {
      accountId
      success
      resentVerificationEmail
    }
  }
`;

export default accountSignInMutation;
