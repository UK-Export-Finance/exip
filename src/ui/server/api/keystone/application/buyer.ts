import apollo from '../../../graphql/apollo';
import updateBuyerMutation from '../../../graphql/mutations/update-application/buyer';
import { ApolloResponse } from '../../../../types';

const buyer = {
  update: async (id: string, update: object) => {
    try {
      console.info('Updating application buyer country');

      const variables = {
        where: {
          id,
        },
        data: update,
      };

      const response = (await apollo('POST', updateBuyerMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating application buyer ', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating application buyer ', response.networkError.result.errors);
      }

      if (response?.data?.updateBuyer) {
        return response.data.updateBuyer;
      }

      console.error(response);
      throw new Error('Updating application buyer country');
    } catch (err) {
      console.error(err);
      throw new Error('Updating application buyer country');
    }
  },
};

export default buyer;
