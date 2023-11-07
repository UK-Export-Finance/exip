import gql from 'graphql-tag';

const verifyAccountEmailMutation = gql`
  mutation verifyAccountEmailAddress($token: String!, $id: String!) {
    verifyAccountEmailAddress(token: $token, id: $id) {
      success
      accountId
      expired
      invalid
    }
  }
`;

export default verifyAccountEmailMutation;
