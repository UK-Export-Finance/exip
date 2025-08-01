import apollo from '../../../../graphql/apollo';
import updateCompanyDifferentTradingAddressMutation from '../../../../graphql/mutations/update-application/companyDifferentTradingAddress';
import { ApolloResponse } from '../../../../../types';

/**
 * updateCompanyDifferentTradingAddress
 * Update an application's "companyDifferentTradingAddress"
 * @param {string} id CompanyDifferentTradingAddress id
 * @param {object} update
 * @returns {Promise<object>} Updated companyDifferentTradingAddress
 */
const updateCompanyDifferentTradingAddress = async (id: string, update: object) => {
  try {
    console.info('Updating application companyDifferentTradingAddress');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateCompanyDifferentTradingAddressMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating companyDifferentTradingAddress %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating companyDifferentTradingAddress %o', response.networkError.result.errors);
    }

    if (response?.data?.updateCompanyDifferentTradingAddress) {
      return response.data.updateCompanyDifferentTradingAddress;
    }

    console.error('Error with GraphQL updateCompanyDifferentTradingAddressMutation %o', response);

    throw new Error('Updating company companyDifferentTradingAddress');
  } catch (error) {
    console.error('Error updating companyDifferentTradingAddress %o', error);

    throw new Error('Updating companyDifferentTradingAddress');
  }
};

export default updateCompanyDifferentTradingAddress;
