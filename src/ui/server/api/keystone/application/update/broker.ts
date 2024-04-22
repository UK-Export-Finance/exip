import apollo from '../../../../graphql/apollo';
import updateBrokerMutation from '../../../../graphql/mutations/update-application/broker';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBroker
 * Update an application's "broker"
 * @param {String} Broker ID
 * @param {Object} Broker update
 * @returns {Promise<Object>} Updated broker
 */
const updateBroker = async (id: string, update: object) => {
  try {
    console.info('Updating application broker');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateBrokerMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application broker %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application broker %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBroker) {
      return response.data.updateBroker;
    }

    console.error('Error with GraphQL updateBrokerMutation %O', response);
    throw new Error('Updating application broker');
  } catch (err) {
    console.error('Error updating application broker %O', err);
    throw new Error('Updating application broker');
  }
};

export default updateBroker;
