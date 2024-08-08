import apollo from '../../../../graphql/apollo';
import updateBuyerTradingHistoryMutation from '../../../../graphql/mutations/update-application/buyerTradingHistory';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBuyer
 * Update an application's "buyerTradingHistory"
 * @param {String} buyerTradingHistory ID
 * @param {Object} buyerTradingHistory update
 * @returns {Promise<Object>} Updated buyerTradingHistory
 */
const updateBuyerTradingHistory = async (id: string, update: object) => {
  try {
    console.info('Updating buyer trading history');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateBuyerTradingHistoryMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating buyer trading history %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating buyer trading history %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBuyerTradingHistory) {
      return response.data.updateBuyerTradingHistory;
    }

    console.error('Error with GraphQL updateBuyerMutation %O', response);

    throw new Error('Updating buyer trading history');
  } catch (error) {
    console.error('Error updating application buyer %O', error);

    throw new Error('Updating buyer trading history');
  }
};

export default updateBuyerTradingHistory;
