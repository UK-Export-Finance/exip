import gql from 'graphql-tag';

const accountSignInMutation = gql`
  mutation AccountSignIn($urlOrigin: String!, $email: String!, $password: String!) {
    accountSignIn(urlOrigin: $urlOrigin, email: $email, password: $password) {
      accountId
      success
      resentVerificationEmail
    }
  }
`;

export default accountSignInMutation;
