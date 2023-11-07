import gql from 'graphql-tag';

const createInsuranceFeedbackMutation = gql`
  mutation createFeedbackAndSendEmail(
    $satisfaction: String!
    $improvement: String!
    $otherComments: String!
    $referralUrl: String!
    $product: String!
    $service: String!
  ) {
    createFeedbackAndSendEmail(
      satisfaction: $satisfaction
      improvement: $improvement
      otherComments: $otherComments
      referralUrl: $referralUrl
      product: $product
      service: $service
    ) {
      success
    }
  }
`;

export default createInsuranceFeedbackMutation;
