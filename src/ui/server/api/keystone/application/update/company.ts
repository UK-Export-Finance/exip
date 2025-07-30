import apollo from '../../../../graphql/apollo';
import updateApplicationCompanyMutation from '../../../../graphql/mutations/update-application/company';
import { ApolloResponse } from '../../../../../types';

/**
 * updateCompany
 * Update an application's "company"
 * @param {string} Company ID
 * @param {object} Company update
 * @returns {Promise<object>} Updated company
 */
const updateCompany = async (id: string, update: object) => {
  try {
    console.info('Updating application company');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationCompanyMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application company %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application company %o', response.networkError.result.errors);
    }

    if (response?.data?.updateCompany) {
      return response.data.updateCompany;
    }

    console.error('Error with GraphQL updateApplicationCompanyMutation %o', response);

    throw new Error('Updating application company');
  } catch (error) {
    console.error('Error updating application company %o', error);

    throw new Error('Updating application company');
  }
};

export default updateCompany;
