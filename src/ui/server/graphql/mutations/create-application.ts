import gql from 'graphql-tag';

const createApplicationMutation = gql`
  mutation {
    createApplication(data: {}) {
      id
      referenceNumber
    }
  }
`;

export default createApplicationMutation;
