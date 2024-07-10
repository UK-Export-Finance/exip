import gql from 'graphql-tag';

const createAnApplicationMutation = gql`
  mutation createAnApplication(
    $accountId: String!
    $eligibilityAnswers: ApplicationEligibility!
    $company: CompanyInput!
    $sectionReview: SectionReviewInput!
  ) {
    createAnApplication(accountId: $accountId, eligibilityAnswers: $eligibilityAnswers, company: $company, sectionReview: $sectionReview) {
      success
      referenceNumber
    }
  }
`;

export default createAnApplicationMutation;
