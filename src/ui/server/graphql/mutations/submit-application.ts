import gql from 'graphql-tag';

const submitApplicationMutation = gql`
  mutation ($applicationId: String!) {
    submitApplication(applicationId: $applicationId) {
      success
    }
  }
`;

export default submitApplicationMutation;
