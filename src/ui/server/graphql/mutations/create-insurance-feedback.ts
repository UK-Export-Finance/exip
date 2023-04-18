import gql from 'graphql-tag';

const createInsuranceFeedbackMutation = gql`
  mutation CreateFeedback($data: FeedbackCreateInput!) {
    createFeedback(data: $data) {
      type
      satisfaction
      improvement
      otherComments
      referralUrl
    }
  }
`;

export default createInsuranceFeedbackMutation;
