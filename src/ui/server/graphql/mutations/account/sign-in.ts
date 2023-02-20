import gql from 'graphql-tag';

const accountSignInMutation = gql`
  mutation AccountSignIn($email: String!, $password: String!) {
    accountSignIn(email: $email, password: $password) {
      success
    }
  }
`;

export default accountSignInMutation;
