import { ApolloResponse, InsuranceFeedbackVariables } from '../../../../types';
import apollo from '../../../graphql/apollo';
import createInsuranceFeedbackMutation from '../../../graphql/mutations/create-insurance-feedback';

const feedback = {
  create: async (feedbackVariables: InsuranceFeedbackVariables) => {
    try {
      console.info('Creating feedback');

      const response = (await apollo('POST', createInsuranceFeedbackMutation, feedbackVariables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error creating feedback %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error error creating feedback %o', response.networkError.result.errors);
      }

      if (response?.data?.createFeedbackAndSendEmail) {
        return response.data.createFeedbackAndSendEmail;
      }

      console.error('Error with GraphQL createInsuranceFeedbackMutation %o', response);

      throw new Error('Creating feedback');
    } catch (error) {
      console.error('Error creating feedback %o', error);

      throw new Error('Creating feedback');
    }
  },
};

export default feedback;
