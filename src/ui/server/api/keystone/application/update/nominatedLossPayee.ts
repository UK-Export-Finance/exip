import apollo from '../../../../graphql/apollo';
import updateApplicationNominatedLossPayeeMutation from '../../../../graphql/mutations/update-application/nominated-loss-payee';
import { ApolloResponse } from '../../../../../types';

/**
 * updateNominatedLossPayee
 * Update an application's "nominated loss payee"
 * @param {string} Nominated loss payee ID
 * @param {object} Nominated loss payee update
 * @returns {Promise<object>} Updated nominated loss payee
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
      console.error('GraphQL error updating application nominated loss payee %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application nominated loss payee %o', response.networkError.result.errors);
    }

    if (response?.data?.updateNominatedLossPayee) {
      return response.data.updateNominatedLossPayee;
    }

    console.error('Error with GraphQL updateApplicationNominatedLossPayeeMutation %o', response);

    throw new Error('Updating application nominated loss payee');
  } catch (error) {
    console.error('Error updating application nominated loss payee %o', error);

    throw new Error('Updating application nominated loss payee');
  }
};

export default updateNominatedLossPayee;
