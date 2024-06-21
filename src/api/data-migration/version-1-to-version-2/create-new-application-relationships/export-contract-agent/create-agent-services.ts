import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createAgentServices
 * Create new "export contract agent service" entires
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} agentIdsConnectArray: Array of agent IDs "connect" objects
 * @returns {Promise<Array<ApplicationExportContractAgentService>>} Export contract agent service entries
 */
const createAgentServices = async (context: Context, agentIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating exportContractAgentServices with agent relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgentService.createMany({
      data: agentIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createAgentServices;
