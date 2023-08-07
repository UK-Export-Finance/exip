import gql from 'graphql-tag';

const accountPasswordResetMutation = gql`
  mutation accountPasswordReset($token: String!, $password: String!) {
    accountPasswordReset(token: $token, password: $password) {
      success
      hasBeenUsedBefore
    }
  }
`;

export default accountPasswordResetMutation;
