import apollo from '../../../../graphql/apollo';
import updateApplicationPrivateMarketMutation from '../../../../graphql/mutations/update-application/private-market';
import { ApolloResponse } from '../../../../../types';

/**
 * updatePrivateMarket
 * Update an application's "privateMarket"
 * @param {String} privateMarket ID
 * @param {Object} privateMarket update
 * @returns {Promise<Object>} Updated private market
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
      console.error('GraphQL error updating application private market %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application private market %O', response.networkError.result.errors);
    }

    if (response?.data?.updatePrivateMarket) {
      return response.data.updatePrivateMarket;
    }

    console.error('Error with GraphQL updateApplicationPrivateMarketMutation %O', response);
    throw new Error('Updating application private market');
  } catch (err) {
    console.error('Error updating application private market %O', err);
    throw new Error('Updating application private market');
  }
};

export default updatePrivateMarket;
