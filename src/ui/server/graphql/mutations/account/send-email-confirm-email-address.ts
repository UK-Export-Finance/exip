import gql from 'graphql-tag';

const sendEmailConfirmEmailAddressMutation = gql`
  mutation sendEmailConfirmEmailAddress($urlOrigin: String!, $accountId: String!) {
    sendEmailConfirmEmailAddress(urlOrigin: $urlOrigin, accountId: $accountId) {
      success
      emailRecipient
    }
  }
`;

export default sendEmailConfirmEmailAddressMutation;
