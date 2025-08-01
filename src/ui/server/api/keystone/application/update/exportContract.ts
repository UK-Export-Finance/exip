import apollo from '../../../../graphql/apollo';
import updateApplicationExportContractMutation from '../../../../graphql/mutations/update-application/export-contract';
import { ApolloResponse } from '../../../../../types';

/**
 * updateExportContract
 * Update an application's "exportContract"
 * @param {string} ExportContract ID
 * @param {object} ExportContract update
 * @returns {Promise<object>} Updated export contract
 */
const updateExportContract = async (id: string, update: object) => {
  try {
    console.info('Updating application export contract');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationExportContractMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application export contract %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application export contract %o', response.networkError.result.errors);
    }

    if (response?.data?.updateExportContract) {
      return response.data.updateExportContract;
    }

    console.error('Error with GraphQL updateApplicationExportContractMutation %o', response);

    throw new Error('Updating application export contract');
  } catch (error) {
    console.error('Error updating application export contract %o', error);

    throw new Error('Updating application export contract');
  }
};

export default updateExportContract;
