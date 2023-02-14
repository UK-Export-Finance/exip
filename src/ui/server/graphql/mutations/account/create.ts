import gql from 'graphql-tag';

const createExporterMutation = gql`
  mutation CreateAccount($data: AccountInput!) {
    createAccount(data: $data) {
      id
      firstName
      lastName
      email
    }
  }
`;

export default createExporterMutation;
