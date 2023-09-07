import gql from 'graphql-tag';

const createAnApplicationMutation = gql`
  mutation ($accountId: String!, $eligibilityAnswers: ApplicationEligibility!) {
    createAnApplication(accountId: $accountId, eligibilityAnswers: $eligibilityAnswers) {
      success
    }
  }
`;

export default createAnApplicationMutation;
