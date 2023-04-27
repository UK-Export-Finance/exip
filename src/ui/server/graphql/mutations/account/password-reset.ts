import gql from 'graphql-tag';

const accountPasswordResetMutation = gql`
  mutation AccountPasswordReset($token: String!, $password: String!) {
    accountPasswordReset(token: $token, password: $password) {
      success
    }
  }
`;

export default accountPasswordResetMutation;
