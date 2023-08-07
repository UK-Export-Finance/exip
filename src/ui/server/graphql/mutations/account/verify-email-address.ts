import gql from 'graphql-tag';

const verifyAccountEmailMutation = gql`
  mutation verifyAccountEmailAddress($token: String!) {
    verifyAccountEmailAddress(token: $token) {
      success
      accountId
      expired
      invalid
    }
  }
`;

export default verifyAccountEmailMutation;
