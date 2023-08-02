import apollo from '../../../graphql/apollo';
import updateBuyerMutation from '../../../graphql/mutations/update-application/buyer';
import { ApolloResponse } from '../../../../types';

const buyer = {
  update: async (id: string, update: object) => {
    try {
      console.info('Updating application buyer');

      const variables = {
        where: {
          id,
        },
        data: update,
      };

      const response = (await apollo('POST', updateBuyerMutation, variables)) as ApolloResponse;

      if (response.errors) {
        console.error('GraphQL error updating application buyer %O', response.errors);
      }

      if (response?.networkError?.result?.errors) {
        console.error('GraphQL network error updating application buyer %O', response.networkError.result.errors);
      }

      if (response?.data?.updateBuyer) {
        return response.data.updateBuyer;
      }

      console.error('Error with apollo updateBuyerMutation %O', response);
      throw new Error('Updating application buyer');
    } catch (err) {
      console.error('Error updating application buyer %O', err);
      throw new Error('Updating application buyer');
    }
  },
};

export default buyer;
