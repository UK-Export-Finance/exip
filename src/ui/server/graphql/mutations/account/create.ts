import gql from 'graphql-tag';

const createExporterMutation = gql`
  mutation CreateAccount($data: AccountInput!) {
    createAccount(data: $data) {
      firstName
      lastName
      email
    }
  }
`;

export default createExporterMutation;
