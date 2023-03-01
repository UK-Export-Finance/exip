import gql from 'graphql-tag';

const createExporterMutation = gql`
  mutation CreateAccount($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createAccount(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      success
      id
      firstName
      lastName
      email
    }
  }
`;

export default createExporterMutation;
