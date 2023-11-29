import gql from 'graphql-tag';

const createAnApplicationMutation = gql`
  mutation createAnApplication($accountId: String!, $eligibilityAnswers: ApplicationEligibility!, $company: CompanyInput!) {
    createAnApplication(accountId: $accountId, eligibilityAnswers: $eligibilityAnswers, company: $company) {
      success
      referenceNumber
    }
  }
`;

export default createAnApplicationMutation;
