import { Context, ApplicationExportContractAgentServiceCharge } from '../../types';

/**
 * createAnExportContractAgentServiceCharge
 * Create an agent service charge with agent service relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {String} agentServiceId: Export contract agent service ID
 * @returns {Promise<Object>} Created export contract agent service
 */
const createAnExportContractAgentServiceCharge = async (context: Context, agentServiceId: string): Promise<ApplicationExportContractAgentServiceCharge> => {
  console.info('Creating an export contract agent service charge for %s', agentServiceId);

  try {
    const agentService = await context.db.ExportContractAgentServiceCharge.createOne({
      data: {
        service: {
          connect: { id: agentServiceId },
        },
      },
    });

    return agentService;
  } catch (error) {
    console.error('Error creating an export contract agent service charge %O', error);

    throw new Error(`Creating an export contract agent service charge ${error}`);
  }
};

export default createAnExportContractAgentServiceCharge;
