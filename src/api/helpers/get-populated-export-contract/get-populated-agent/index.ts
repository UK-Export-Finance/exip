import { Context } from '.keystone/types'; // eslint-disable-line
import getExportContractAgentById from '../../get-export-contract-agent-by-id';
import getExportContractAgentServiceById from '../../get-export-contract-agent-service-by-id';
import getExportContractAgentServiceChargeById from '../../get-export-contract-agent-service-charge-by-id';

/**
 * getPopulatedAgent
 * Get a populated export contract agent
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: agent ID
 * @returns {Promise<ApplicationExportContractAgent>}
 */
const getPopulatedAgent = async (context: Context, id: string) => {
  try {
    console.info('Getting populated exportContract agent %s', id);

    const exportContractAgent = await getExportContractAgentById(context, id);

    const exportContractAgentService = await getExportContractAgentServiceById(context, exportContractAgent.serviceId);

    const exportContractAgentServiceCharge = await getExportContractAgentServiceChargeById(context, exportContractAgentService.chargeId);

    const populatedAgent = {
      ...exportContractAgent,
      service: {
        ...exportContractAgentService,
        charge: exportContractAgentServiceCharge,
      },
    };

    return populatedAgent;
  } catch (error) {
    console.error('Getting populated exportContract agent %s %o', id, error);

    throw new Error(`Error Getting populated exportContract agent ${id} ${error}`);
  }
};

export default getPopulatedAgent;
