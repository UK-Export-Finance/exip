import { ApolloResponse } from '../../../../types';
import apollo from '../../../graphql/apollo';
import updateEligibilityMutation from '../../../graphql/mutations/update-eligibility';

const eligibility = {
  update: async (eligibilityId: string, eligibilityAnswers: object) => {
    try {
      console.info('Updating eligibility');

      const variables = {
        where: {
          id: eligibilityId,
        },
        data: eligibilityAnswers,
      };

      const response = (await apollo('POST', updateEligibilityMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating eligibility %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating eligibility %O', response.networkError.result.errors);
      }

      if (response?.data?.updateEligibility) {
        return response.data.updateEligibility;
      }

      console.error('Error with GraphQL updateEligibilityMutation %O', response);
      throw new Error('Updating eligibility');
    } catch (err) {
      console.error('Error updating eligibility %O', err);
      throw new Error('Updating eligibility');
    }
  },
};

export default eligibility;
