import apollo from '../../../../graphql/apollo';
import updateCompanyDifferentTradingAddressMutation from '../../../../graphql/mutations/update-application/companyDifferentTradingAddress';
import { ApolloResponse } from '../../../../../types';

/**
 * updateCompanyDifferentTradingAddress
 * Update an application's "companyDifferentTradingAddress"
 * @param {String} id CompanyDifferentTradingAddress id
 * @param {Object} update
 * @returns {Promise<Object>} Updated companyDifferentTradingAddress
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
      console.error('GraphQL error updating companyDifferentTradingAddress %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating companyDifferentTradingAddress %O', response.networkError.result.errors);
    }

    if (response?.data?.updateCompanyDifferentTradingAddress) {
      return response.data.updateCompanyDifferentTradingAddress;
    }

    console.error('Error with GraphQL updateCompanyDifferentTradingAddressMutation %O', response);
    throw new Error('Updating company companyDifferentTradingAddress');
  } catch (err) {
    console.error('Error updating companyDifferentTradingAddress %O', err);
    throw new Error('Updating companyDifferentTradingAddress');
  }
};

export default updateCompanyDifferentTradingAddress;
