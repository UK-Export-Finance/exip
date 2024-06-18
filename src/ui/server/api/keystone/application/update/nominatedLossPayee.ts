import apollo from '../../../../graphql/apollo';
import updateApplicationNominatedLossPayeeMutation from '../../../../graphql/mutations/update-application/nominated-loss-payee';
import { ApolloResponse } from '../../../../../types';

/**
 * updateNominatedLossPayee
 * Update an application's "nominated loss payee"
 * @param {String} Nominated loss payee ID
 * @param {Object} Nominated loss payee update
 * @returns {Promise<Object>} Updated nominated loss payee
 */
const updateNominatedLossPayee = async (id: string, update: object) => {
  try {
    console.info('Updating application nominated loss payee');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationNominatedLossPayeeMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application nominated loss payee %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application nominated loss payee %O', response.networkError.result.errors);
    }

    if (response?.data?.updateNominatedLossPayee) {
      return response.data.updateNominatedLossPayee;
    }

    console.error('Error with GraphQL updateApplicationNominatedLossPayeeMutation %O', response);
    throw new Error('Updating application nominated loss payee');
  } catch (err) {
    console.error('Error updating application nominated loss payee %O', err);
    throw new Error('Updating application nominated loss payee');
  }
};

export default updateNominatedLossPayee;
