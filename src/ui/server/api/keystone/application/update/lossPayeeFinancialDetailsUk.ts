import apollo from '../../../../graphql/apollo';
import updateLossPayeeFinancialDetailsUkMutation from '../../../../graphql/mutations/update-application/loss-payee-financial-details-uk';
import { ApolloResponse } from '../../../../../types';

/**
 * updateLossPayeeFinancialDetailsUk
 * Update an application's "loss payee financial details uk"
 * @param {string} loss payee financial details uk ID
 * @param {object} loss payee financial details uk update
 * @returns {Promise<object>} Updated loss payee financial details uk
 */
const updateLossPayeeFinancialDetailsUk = async (id: string, update: object) => {
  try {
    console.info('Updating application loss payee financial details uk');
    const variables = {
      id,
      ...update,
    };

    const response = (await apollo('POST', updateLossPayeeFinancialDetailsUkMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application loss payee financial details uk %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application loss payee financial details uk %o', response.networkError.result.errors);
    }

    if (response?.data?.updateLossPayeeFinancialDetailsUk) {
      return response.data.updateLossPayeeFinancialDetailsUk;
    }

    console.error('Error with GraphQL updateLossPayeeFinancialDetailsUkMutation %o', response);

    throw new Error('Updating application loss payee financial details uk');
  } catch (error) {
    console.error('Error updating application loss payee financial details uk %o', error);

    throw new Error('Updating application loss payee financial details uk');
  }
};

export default updateLossPayeeFinancialDetailsUk;
