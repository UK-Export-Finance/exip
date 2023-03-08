import gql from 'graphql-tag';

const verifyExporterEmailMutation = gql`
  mutation VerifyAccountEmailAddress($token: String!) {
    verifyAccountEmailAddress(token: $token) {
      success
      accountId
    }
  }
`;

export default verifyExporterEmailMutation;
