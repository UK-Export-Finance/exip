import gql from 'graphql-tag';

const sendEmailPasswordResetLinkMutation = gql`
  mutation SendEmailPasswordResetLink($email: String!) {
    sendEmailPasswordResetLink(email: $email) {
      success
    }
  }
`;

export default sendEmailPasswordResetLinkMutation;
