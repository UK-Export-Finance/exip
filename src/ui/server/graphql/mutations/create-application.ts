import gql from 'graphql-tag';

const createApplicationMutation = gql`
  mutation ($data: ApplicationCreateInput!) {
    createApplication(data: $data) {
      id
      referenceNumber
      eligibility {
        id
      }
    }
  }
`;

export default createApplicationMutation;
