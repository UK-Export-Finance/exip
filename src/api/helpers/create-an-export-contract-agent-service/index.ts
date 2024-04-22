import { Context, ApplicationExportContractAgentService } from '../../types';

/**
 * createAnExportContractAgentService
 * Create an agent service with an agent relationship.
 * @param {Object} context: KeystoneJS context API
 * @param {String} agentId: Export contract agent ID
 * @returns {Promise<Object>} Created export contract agent service
 */
const createAnExportContractAgentService = async (context: Context, agentId: string): Promise<ApplicationExportContractAgentService> => {
  console.info('Creating an export contract agent service for ', agentId);

  try {
    const agentService = await context.db.ExportContractAgentService.createOne({
      data: {
        agent: {
          connect: { id: agentId },
        },
      },
    });

    return agentService;
  } catch (err) {
    console.error('Error creating an export contract agent service %O', err);

    throw new Error(`Creating an export contract agent service ${err}`);
  }
};

export default createAnExportContractAgentService;
