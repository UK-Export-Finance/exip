import gql from 'graphql-tag';

const sendEmailInsuranceFeedback = gql`
  mutation SendEmailInsuranceFeedback($satisfaction: String!, $improvement: String!, $otherComments: String!) {
    sendEmailInsuranceFeedback(satisfaction: $satisfaction, improvement: $improvement, otherComments: $otherComments) {
      success
    }
  }
`;

export default sendEmailInsuranceFeedback;
