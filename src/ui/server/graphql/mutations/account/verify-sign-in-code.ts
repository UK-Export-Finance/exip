import gql from 'graphql-tag';

const verifyAccountSignInCodeMutation = gql`
  mutation verifyAccountSignInCode($accountId: String!, $securityCode: String!) {
    verifyAccountSignInCode(accountId: $accountId, securityCode: $securityCode) {
      success
      firstName
      lastName
      email
      token
      expires
      accountId
    }
  }
`;

export default verifyAccountSignInCodeMutation;
