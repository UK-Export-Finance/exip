import { ApolloResponse, InsuranceFeedbackVariables } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createInsuranceFeedbackMutation from '../../../graphql/mutations/create-insurance-feedback';

const feedback = {
  create: async (feedbackVariables: InsuranceFeedbackVariables) => {
    try {
      console.info('Creating feedback');

      const variables = {
        data: feedbackVariables,
      };

      const response = (await apollo('POST', createInsuranceFeedbackMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating feedback ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error error creating feedback', response.networkError.result.errors);
      }

      if (response?.data?.createFeedback) {
        return response.data.createFeedback;
      }

      console.error(response);
      throw new Error('Creating feedback');
    } catch (err) {
      console.error(err);
      throw new Error('Creating feedback');
    }
  },
};

export default feedback;
