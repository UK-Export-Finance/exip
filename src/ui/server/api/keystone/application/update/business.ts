import apollo from '../../../../graphql/apollo';
import updateBusinessMutation from '../../../../graphql/mutations/update-application/business';
import { ApolloResponse } from '../../../../../types';

/**
 * updateBusiness
 * Update an application's "business"
 * @param {string} Business ID
 * @param {object} Business update
 * @returns {Promise<object>} Updated business
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
      console.error('GraphQL error updating application business %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application business %o', response.networkError.result.errors);
    }

    if (response?.data?.updateBusiness) {
      return response.data.updateBusiness;
    }

    console.error('Error with GraphQL updateBusinessMutation %o', response);

    throw new Error('Updating application business');
  } catch (error) {
    console.error('Error updating application business %o', error);

    throw new Error('Updating application business');
  }
};

export default updateBusiness;
