import gql from 'graphql-tag';

const createInsuranceFeedbackMutation = gql`
  mutation CreateFeedback($data: FeedbackCreateInput!) {
    createFeedback(data: $data) {
      service
      satisfaction
      improvement
      otherComments
      referralUrl
      product
    }
  }
`;

export default createInsuranceFeedbackMutation;
