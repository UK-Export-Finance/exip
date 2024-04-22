import apollo from '../../../../graphql/apollo';
import updateApplicationDeclarationMutation from '../../../../graphql/mutations/update-application/declaration';
import { ApolloResponse } from '../../../../../types';

/**
 * updateDeclaration
 * Update an application's declaration
 * @param {String} Declaration ID
 * @param {Object} Declaration update
 * @returns {Promise<Object>} Updated declaration
 */
const updateDeclaration = async (id: string, update: object) => {
  try {
    console.info('Updating application declaration');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationDeclarationMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application declaration %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application declaration %O', response.networkError.result.errors);
    }

    if (response?.data?.updateDeclaration) {
      return response.data.updateDeclaration;
    }

    console.error('Error with GraphQL updateApplicationDeclarationMutation %O', response);
    throw new Error('Updating application declaration');
  } catch (err) {
    console.error('Error updating application declaration %O', err);
    throw new Error('Updating application declaration');
  }
};

export default updateDeclaration;
