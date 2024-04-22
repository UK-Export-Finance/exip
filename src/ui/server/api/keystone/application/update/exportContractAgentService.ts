import apollo from '../../../../graphql/apollo';
import updateApplicationExportContractAgentServiceMutation from '../../../../graphql/mutations/update-application/export-contract-agent-service';
import { ApolloResponse } from '../../../../../types';

/**
 * updateExportContractAgentService
 * Update an application's "exportContractAgentService"
 * @param {String} ExportContractAgentService ID
 * @param {Object} ExportContractAgentService update
 * @returns {Promise<Object>} Updated export contract agent service
 */
const updateExportContractAgentService = async (id: string, update: object) => {
  try {
    console.info('Updating application export contract agent service');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationExportContractAgentServiceMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application export contract agent service %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application export contract agent service %O', response.networkError.result.errors);
    }

    if (response?.data?.updateExportContractAgentService) {
      return response.data.updateExportContractAgentService;
    }

    console.error('Error with GraphQL updateApplicationExportContractMutation %O', response);
    throw new Error('Updating application export contract agent service');
  } catch (err) {
    console.error('Error updating application export contract agent service %O', err);
    throw new Error('Updating application export contract agent service');
  }
};

export default updateExportContractAgentService;
