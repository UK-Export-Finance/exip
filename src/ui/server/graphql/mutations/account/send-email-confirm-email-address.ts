import gql from 'graphql-tag';

const sendEmailConfirmEmailAddressMutation = gql`
  mutation SendEmailConfirmEmailAddress($exporterId: String!) {
    sendEmailConfirmEmailAddress(exporterId: $exporterId) {
      success
      emailRecipient
    }
  }
`;

export default sendEmailConfirmEmailAddressMutation;
