import apollo from '../../../../graphql/apollo';
import updateBusinessMutation from '../../../../graphql/mutations/update-application/business';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBusiness
 * Update an application's "business"
 * @param {String} Business ID
 * @param {Object} Business update
 * @returns {Promise<Object>} Updated business
 */
const updateBusiness = async (id: string, update: object) => {
  try {
    console.info('Updating application business');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateBusinessMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application business %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application business %O', response.networkError.result.errors);
    }

    if (response?.data?.updateBusiness) {
      return response.data.updateBusiness;
    }

    console.error('Error with GraphQL updateBusinessMutation %O', response);
    throw new Error('Updating application business');
  } catch (err) {
    console.error('Error updating application business %O', err);
    throw new Error('Updating application business');
  }
};

export default updateBusiness;
