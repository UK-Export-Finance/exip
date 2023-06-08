import gql from 'graphql-tag';

const verifyAccountReactivationTokenMutation = gql`
  mutation VerifyAccountReactivationToken($token: String!) {
    verifyAccountReactivationToken(token: $token) {
      success
    }
  }
`;

export default verifyAccountReactivationTokenMutation;
