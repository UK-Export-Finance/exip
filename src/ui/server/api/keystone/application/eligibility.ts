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
        console.error('GraphQL error updating eligibility %o', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating eligibility %o', response.networkError.result.errors);
      }

      if (response?.data?.updateEligibility) {
        return response.data.updateEligibility;
      }

      console.error('Error with GraphQL updateEligibilityMutation %o', response);

      throw new Error('Updating eligibility');
    } catch (error) {
      console.error('Error updating eligibility %o', error);

      throw new Error('Updating eligibility');
    }
  },
};

export default eligibility;
