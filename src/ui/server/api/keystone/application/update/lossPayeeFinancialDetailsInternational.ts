import apollo from '../../../../graphql/apollo';
import updateLossPayeeFinancialDetailsInternationalMutation from '../../../../graphql/mutations/update-application/loss-payee-financial-details-international';
import { ApolloResponse } from '../../../../../types';

/**
 * updateLossPayeeFinancialDetailsInternational
 * Update an application's "loss payee financial details international"
 * @param {String} loss payee financial details international ID
 * @param {Object} loss payee financial details international update
 * @returns {Promise<Object>} Updated loss payee financial details international
 */
const updateLossPayeeFinancialDetailsInternational = async (id: string, update: object) => {
  try {
    console.info('Updating application loss payee financial details international');
    const variables = {
      id,
      ...update,
    };

    const response = (await apollo('POST', updateLossPayeeFinancialDetailsInternationalMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application loss payee financial details international %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application loss payee financial details international %O', response.networkError.result.errors);
    }

    if (response?.data?.updateLossPayeeFinancialDetailsInternational) {
      return response.data.updateLossPayeeFinancialDetailsInternational;
    }

    console.error('Error with GraphQL updateLossPayeeFinancialDetailsInternational %O', response);
    throw new Error('Updating application loss payee financial details international');
  } catch (err) {
    console.error('Error updating application loss payee financial details international %O', err);
    throw new Error('Updating application loss payee financial details international');
  }
};

export default updateLossPayeeFinancialDetailsInternational;
