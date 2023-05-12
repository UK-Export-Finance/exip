import gql from 'graphql-tag';

const createInsuranceFeedbackMutation = gql`
  mutation CreateFeedbackAndEmail(
    $satisfaction: String!
    $improvement: String!
    $otherComments: String!
    $referralUrl: String!
    $product: String!
    $service: String!
  ) {
    createFeedbackAndEmail(
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
