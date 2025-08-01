import apollo from '../../../../graphql/apollo';
import updateApplicationPrivateMarketMutation from '../../../../graphql/mutations/update-application/private-market';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePrivateMarket
 * Update an application's "privateMarket"
 * @param {string} privateMarket ID
 * @param {object} privateMarket update
 * @returns {Promise<object>} Updated private market
 */
const updatePrivateMarket = async (id: string, update: object) => {
  try {
    console.info('Updating application private market');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationPrivateMarketMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application private market %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application private market %o', response.networkError.result.errors);
    }

    if (response?.data?.updatePrivateMarket) {
      return response.data.updatePrivateMarket;
    }

    console.error('Error with GraphQL updateApplicationPrivateMarketMutation %o', response);

    throw new Error('Updating application private market');
  } catch (error) {
    console.error('Error updating application private market %o', error);

    throw new Error('Updating application private market');
  }
};

export default updatePrivateMarket;
