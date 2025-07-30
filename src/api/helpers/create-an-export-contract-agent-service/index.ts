import { Context, ApplicationExportContractAgentService } from '../../types';

/**
 * createAnExportContractAgentService
 * Create an agent service with an agent relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {string} agentId: Export contract agent ID
 * @returns {Promise<object>} Created export contract agent service
 */
const createAnExportContractAgentService = async (context: Context, agentId: string): Promise<ApplicationExportContractAgentService> => {
  console.info('Creating an export contract agent service for %s', agentId);

  try {
    const agentService = await context.db.ExportContractAgentService.createOne({
      data: {
        agent: {
          connect: { id: agentId },
        },
      },
    });

    return agentService;
  } catch (error) {
    console.error('Error creating an export contract agent service %o', error);

    throw new Error(`Creating an export contract agent service ${error}`);
  }
};

export default createAnExportContractAgentService;
