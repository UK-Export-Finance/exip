import gql from 'graphql-tag';

const verifyAccountSessionMutation = gql`
  mutation verifyAccountSession($token: String!) {
    verifyAccountSession(token: $token) {
      success
    }
  }
`;

export default verifyAccountSessionMutation;
