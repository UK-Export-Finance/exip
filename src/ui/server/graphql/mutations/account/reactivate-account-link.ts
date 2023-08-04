import gql from 'graphql-tag';

const sendEmailReactivateAccountLinkMutation = gql`
  mutation sendEmailReactivateAccountLink($urlOrigin: String!, $accountId: String!) {
    sendEmailReactivateAccountLink(urlOrigin: $urlOrigin, accountId: $accountId) {
      success
      accountId
      email
    }
  }
`;

export default sendEmailReactivateAccountLinkMutation;
