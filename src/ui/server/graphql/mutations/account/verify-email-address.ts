import gql from 'graphql-tag';

const verifyExporterEmailMutation = gql`
  mutation VerifyAccountEmailAddress($token: String!) {
    verifyAccountEmailAddress(token: $token) {
      success
    }
  }
`;

export default verifyExporterEmailMutation;
