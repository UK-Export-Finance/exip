import apollo from '../../../../graphql/apollo';
import updateApplicationDeclarationMutation from '../../../../graphql/mutations/update-application/declaration';
import { ApolloResponse } from '../../../../../types';

/**
 * updateDeclarationModernSlavery
 * Update an application's declaration
 * @param {String} Declaration ID
 * @param {Object} Declaration update
 * @returns {Promise<Object>} Updated declaration
 */
const updateDeclarationModernSlavery = async (id: string, update: object) => {
  try {
    console.info('Updating application declaration modern slavery');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationDeclarationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application declaration modern slavery %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application declaration modern slavery %o', response.networkError.result.errors);
    }

    if (response?.data?.updateDeclarationModernSlavery) {
      return response.data.updateDeclarationModernSlavery;
    }

    console.error('Error with GraphQL updateApplicationDeclarationMutation %o', response);

    throw new Error('Updating application declaration modern slavery');
  } catch (error) {
    console.error('Error updating application declaration modern slavery %o', error);

    throw new Error('Updating application declaration modern slavery');
  }
};

export default updateDeclarationModernSlavery;
