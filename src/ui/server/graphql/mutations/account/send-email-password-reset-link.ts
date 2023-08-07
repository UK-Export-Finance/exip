import gql from 'graphql-tag';

const sendEmailPasswordResetLinkMutation = gql`
  mutation sendEmailPasswordResetLink($urlOrigin: String!, $email: String!) {
    sendEmailPasswordResetLink(urlOrigin: $urlOrigin, email: $email) {
      success
      isBlocked
      accountId
    }
  }
`;

export default sendEmailPasswordResetLinkMutation;
