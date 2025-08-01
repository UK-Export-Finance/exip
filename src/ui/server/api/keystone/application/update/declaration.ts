import apollo from '../../../../graphql/apollo';
import updateApplicationDeclarationMutation from '../../../../graphql/mutations/update-application/declaration';
import { ApolloResponse } from '../../../../../types';

/**
 * updateDeclaration
 * Update an application's declaration
 * @param {string} Declaration ID
 * @param {object} Declaration update
 * @returns {Promise<object>} Updated declaration
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
      console.error('GraphQL error updating application declaration %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application declaration %o', response.networkError.result.errors);
    }

    if (response?.data?.updateDeclaration) {
      return response.data.updateDeclaration;
    }

    console.error('Error with GraphQL updateApplicationDeclarationMutation %o', response);

    throw new Error('Updating application declaration');
  } catch (error) {
    console.error('Error updating application declaration %o', error);

    throw new Error('Updating application declaration');
  }
};

export default updateDeclaration;
