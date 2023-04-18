import { ApolloResponse, InsuranceFeedbackVariables } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createInsuranceFeedbackMutation from '../../../graphql/mutations/create-insurance-feedback';

const feedback = {
  // updating DB for feedback
  createInsuranceFeedback: async (feedbackVariables: InsuranceFeedbackVariables) => {
    try {
      console.info('Creating insurance feedback');

      const variables = {
        data: { ...feedbackVariables },
      };

      const response = (await apollo('POST', createInsuranceFeedbackMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating insurance feedback ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error error creating insurance feedback', response.networkError.result.errors);
      }

      if (response?.data?.createFeedback) {
        return response.data.createFeedback;
      }

      console.error(response);
      throw new Error('Creating insurance feedback');
    } catch (err) {
      console.error(err);
      throw new Error('Creating insurance feedback');
    }
  },
};

export default feedback;
