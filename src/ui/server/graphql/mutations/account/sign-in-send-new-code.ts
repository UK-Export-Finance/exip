import gql from 'graphql-tag';

const accountSignInSendNewCodeMutation = gql`
  mutation AccountSignInSendNewCode($accountId: String!) {
    accountSignInSendNewCode(accountId: $accountId) {
      accountId
      success
    }
  }
`;

export default accountSignInSendNewCodeMutation;
