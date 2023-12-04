import apollo from '../../../../graphql/apollo';
import updateDifferentTradingAddressMutation from '../../../../graphql/mutations/update-application/differentTradingAddress';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBroker
 * Update an application's "differentTradingAddress"
 * @param {String} Broker ID
 * @param {Object} Broker update
 * @returns {Object} Updated broker
 */
const updateDifferentTradingAddress = async (id: string, update: object) => {
  try {
    console.info('Updating application differentTradingAddress');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateDifferentTradingAddressMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application differentTradingAddress %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application differentTradingAddress %O', response.networkError.result.errors);
    }

    if (response?.data?.updateDifferentTradingAddress) {
      return response.data.updateDifferentTradingAddress;
    }

    console.error('Error with GraphQL updateDifferentTradingAddressMutation %O', response);
    throw new Error('Updating application differentTradingAddress');
  } catch (err) {
    console.error('Error updating application differentTradingAddress %O', err);
    throw new Error('Updating application differentTradingAddress');
  }
};

export default updateDifferentTradingAddress;
