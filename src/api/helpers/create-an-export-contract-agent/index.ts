import createAnExportContractAgentService from '../create-an-export-contract-agent-service';
import createAnExportContractAgentServiceCharge from '../create-an-export-contract-agent-service-charge';
import { Context, CreateExportContractAgentResponse } from '../../types';

/**
 * createAnExportContractAgent
 * Create an gent with an export contract relationship.
 * @param {Context} context: KeystoneJS context API
 * @param {String} exportContractId: Export contract ID
 * @returns {Promise<Object>} Created export contract agent
 */
const createAnExportContractAgent = async (context: Context, exportContractId: string): Promise<CreateExportContractAgentResponse> => {
  console.info('Creating an export contract agent for ', exportContractId);

  try {
    const agent = await context.db.ExportContractAgent.createOne({
      data: {
        exportContract: {
          connect: { id: exportContractId },
        },
      },
    });

    const agentService = await createAnExportContractAgentService(context, agent.id);
    const agentServiceCharge = await createAnExportContractAgentServiceCharge(context, agentService.id);

    return {
      agent,
      agentService,
      agentServiceCharge,
    };
  } catch (err) {
    console.error('Error creating an export contract agent %O', err);

    throw new Error(`Creating an export contract agent ${err}`);
  }
};

export default createAnExportContractAgent;
