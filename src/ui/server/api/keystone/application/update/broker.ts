import apollo from '../../../../graphql/apollo';
import updateBrokerMutation from '../../../../graphql/mutations/update-application/broker';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBroker
 * Update an application's "broker"
 * @param {string} Broker ID
 * @param {object} Broker update
 * @returns {Promise<object>} Updated broker
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
      console.error('GraphQL error updating application broker %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application broker %o', response.networkError.result.errors);
    }

    if (response?.data?.updateBroker) {
      return response.data.updateBroker;
    }

    console.error('Error with GraphQL updateBrokerMutation %o', response);

    throw new Error('Updating application broker');
  } catch (error) {
    console.error('Error updating application broker %o', error);

    throw new Error('Updating application broker');
  }
};

export default updateBroker;
