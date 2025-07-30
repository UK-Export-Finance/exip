import apollo from '../../../../graphql/apollo';
import updateApplicationExportContractAgentServiceChargeMutation from '../../../../graphql/mutations/update-application/export-contract-agent-service-charge';
import { ApolloResponse } from '../../../../../types';

/**
 * updateExportContractAgentServiceCharge
 * Update an application's "exportContractAgentServiceCharge"
 * @param {string} ExportContractAgentServiceCharge ID
 * @param {object} ExportContractAgentServiceCharge update
 * @returns {Promise<object>} Updated export contract agent service charge
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
      console.error('GraphQL error updating application export contract agent service charge %o', response.errors);
    }

    if (response?.networkError?.result?.errors) {
      console.error('GraphQL network error updating application export contract agent service charge %o', response.networkError.result.errors);
    }

    if (response?.data?.updateExportContractAgentServiceCharge) {
      return response.data.updateExportContractAgentServiceCharge;
    }

    console.error('Error with GraphQL updateApplicationExportContractMutation %o', response);

    throw new Error('Updating application export contract agent service charge');
  } catch (error) {
    console.error('Error updating application export contract agent service charge %o', error);

    throw new Error('Updating application export contract agent service charge');
  }
};

export default updateExportContractAgentServiceCharge;
