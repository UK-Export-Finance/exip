import gql from 'graphql-tag';

const verifyAccountReactivationTokenMutation = gql`
  mutation verifyAccountReactivationToken($token: String!) {
    verifyAccountReactivationToken(token: $token) {
      success
      invalid
      expired
      accountId
    }
  }
`;

export default verifyAccountReactivationTokenMutation;
