import gql from 'graphql-tag';

const sendEmailConfirmEmailAddressMutation = gql`
  mutation SendEmailConfirmEmailAddress($accountId: String!) {
    sendEmailConfirmEmailAddress(accountId: $accountId) {
      success
      emailRecipient
    }
  }
`;

export default sendEmailConfirmEmailAddressMutation;
