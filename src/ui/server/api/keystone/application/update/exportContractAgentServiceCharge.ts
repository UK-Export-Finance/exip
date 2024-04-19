import apollo from '../../../../graphql/apollo';
import updateApplicationExportContractAgentServiceChargeMutation from '../../../../graphql/mutations/update-application/export-contract-agent-service-charge';
import { ApolloResponse } from '../../../../../types';

/**
 * updateExportContractAgentServiceCharge
 * Update an application's "exportContractAgentServiceCharge"
 * @param {String} ExportContractAgentServiceCharge ID
 * @param {Object} ExportContractAgentServiceCharge update
 * @returns {Object} Updated export contract agent service charge
 */
const updateExportContractAgentServiceCharge = async (id: string, update: object) => {
  try {
    console.info('Updating application export contract agent service charge');

    const variables = {
      where: { id },
      data: update,
    };

    const response = (await apollo('POST', updateApplicationExportContractAgentServiceChargeMutation, variables)) as ApolloResponse;

    if (response.errors) {
      console.error('GraphQL error updating application export contract agent service charge %O', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application export contract agent service charge %O', response.networkError.result.errors);
    }

    if (response?.data?.updateExportContractAgentServiceCharge) {
      return response.data.updateExportContractAgentServiceCharge;
    }

    console.error('Error with GraphQL updateApplicationExportContractMutation %O', response);
    throw new Error('Updating application export contract agent service charge');
  } catch (err) {
    console.error('Error updating application export contract agent service charge %O', err);
    throw new Error('Updating application export contract agent service charge');
  }
};

export default updateExportContractAgentServiceCharge;
