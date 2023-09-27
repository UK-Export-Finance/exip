import gql from 'graphql-tag';

const submitApplicationMutation = gql`
  mutation submitApplication($applicationId: String!) {
    submitApplication(applicationId: $applicationId) {
      success
    }
  }
`;

export default submitApplicationMutation;
