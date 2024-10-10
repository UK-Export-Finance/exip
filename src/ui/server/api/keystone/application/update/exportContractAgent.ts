import apollo from '../../../../graphql/apollo';
import updateApplicationExportContractAgentMutation from '../../../../graphql/mutations/update-application/export-contract-agent';
import { ApolloResponse } from '../../../../../types';

/**
 * updateExportContractAgent
 * Update an application's "exportContractAgent"
 * @param {String} ExportContractAgent ID
 * @param {Object} ExportContractAgent update
 * @returns {Promise<Object>} Updated export contract agent
 */
const updateExportContractAgent = async (id: string, update: object) => {
  try {
    console.info('Updating application export contract agent');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationExportContractAgentMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application export contract agent %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application export contract agent %o', response.networkError.result.errors);
    }

    if (response?.data?.updateExportContractAgent) {
      return response.data.updateExportContractAgent;
    }

    console.error('Error with GraphQL updateApplicationExportContractMutation %o', response);

    throw new Error('Updating application export contract agent');
  } catch (error) {
    console.error('Error updating application export contract agent %o', error);

    throw new Error('Updating application export contract agent');
  }
};

export default updateExportContractAgent;
