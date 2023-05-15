import gql from 'graphql-tag';

const sendEmailConfirmEmailAddressMutation = gql`
  mutation SendEmailConfirmEmailAddress($urlOrigin: String!, $accountId: String!) {
    sendEmailConfirmEmailAddress(urlOrigin: $urlOrigin, accountId: $accountId) {
      success
      emailRecipient
    }
  }
`;

export default sendEmailConfirmEmailAddressMutation;
