import gql from 'graphql-tag';

const verifyAccountSessionMutation = gql`
  mutation VerifyAccountSession($token: String!) {
    verifyAccountSession(token: $token) {
      success
    }
  }
`;

export default verifyAccountSessionMutation;
