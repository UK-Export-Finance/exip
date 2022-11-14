import gql from 'graphql-tag';

const createApplicationMutation = gql`
  mutation {
    createApplication(data: {}) {
      id
      referenceNumber
      eligibility {
        id
      }
    }
  }
`;

export default createApplicationMutation;
