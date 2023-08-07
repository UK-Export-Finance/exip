import gql from 'graphql-tag';

const verifyAccountPasswordResetToken = gql`
  query verifyAccountPasswordResetToken($token: String!) {
    verifyAccountPasswordResetToken(token: $token) {
      success
      expired
      invalid
      accountId
    }
  }
`;

export default verifyAccountPasswordResetToken;
