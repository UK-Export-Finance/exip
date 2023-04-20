import { ApolloResponse, InsuranceFeedbackVariables } from '../../../../types';
import apollo from '../../../graphql/apollo';
import sendEmailInsuranceFeedback from '../../../graphql/mutations/send-insurance-feedback-email';

const feedbackEmails = {
  // sending insurance feedback email
  insurance: async (variables: InsuranceFeedbackVariables) => {
    try {
      console.info('Sending insurance feedback email');

      const response = (await apollo('POST', sendEmailInsuranceFeedback, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error sending ninsurance feedback email ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error sending insurance feedback email ', response.networkError.result.errors);
      }

      if (response?.data?.sendEmailInsuranceFeedback) {
        return response.data.sendEmailInsuranceFeedback;
      }

      console.error(response);
      throw new Error('Sending insurance feedback email');
    } catch (err) {
      console.error(err);
      throw new Error('Sending insurance feedback email');
    }
  },
};

export default feedbackEmails;
