import gql from 'graphql-tag';

const accountSignInMutation = gql`
  mutation accountSignIn($urlOrigin: String!, $email: String!, $password: String!) {
    accountSignIn(urlOrigin: $urlOrigin, email: $email, password: $password) {
      accountId
      success
      resentVerificationEmail
      isBlocked
    }
  }
`;

export default accountSignInMutation;
