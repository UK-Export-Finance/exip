import apollo from '../../../../graphql/apollo';
import updateApplicationCompanyMutation from '../../../../graphql/mutations/update-application/company';
import { ApolloResponse } from '../../../../../types';

/**
 * updateCompany
 * Update an application's "company"
 * @param {String} Company ID
 * @param {Object} Company update
 * @returns {Object} Updated company
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
      console.error('GraphQL error updating application company %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application company %O', response.networkError.result.errors);
    }

    if (response?.data?.updateCompany) {
      return response.data.updateCompany;
    }

    console.error('Error with GraphQL updateApplicationCompanyMutation %O', response);

    throw new Error('Updating application company');
  } catch (err) {
    console.error('Error updating application company %O', err);
    throw new Error('Updating application company');
  }
};

export default updateCompany;
