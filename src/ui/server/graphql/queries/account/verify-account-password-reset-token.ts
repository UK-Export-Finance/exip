import gql from 'graphql-tag';

const verifyAccountPasswordResetToken = gql`
  query VerifyAccountPasswordResetToken($token: String!) {
    verifyAccountPasswordResetToken(token: $token) {
      success
      expired
    }
  }
`;

export default verifyAccountPasswordResetToken;
