import gql from 'graphql-tag';

const createInsuranceFeedbackMutation = gql`
  mutation createInsuranceFeedbackAndEmail(
    $satisfaction: String!
    $improvement: String!
    $otherComments: String!
    $referralUrl: String!
    $product: String!
    $service: String!
  ) {
    createInsuranceFeedbackAndEmail(
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
