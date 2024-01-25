import apollo from '../../../../graphql/apollo';
import updateBuyerTradingHistoryMutation from '../../../../graphql/mutations/update-application/buyerTradingHistory';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBuyer
 * Update an application's "buyer"
 * @param {String} Buyer ID
 * @param {Object} Buyer update
 * @returns {Object} Updated buyer
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
  } catch (err) {
    console.error('Error updating application buyer %O', err);
    throw new Error('Updating buyer trading history');
  }
};

export default updateBuyerTradingHistory;
