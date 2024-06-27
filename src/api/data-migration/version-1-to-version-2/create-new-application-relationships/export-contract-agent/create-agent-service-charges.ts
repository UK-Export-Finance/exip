import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createAgentServiceCharges
 * Create new "export contract agent service charge" entires
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} agentServiceIdsConnectArray: Array of agent service IDs "connect" objects
 * @returns {Promise<Array<ApplicationExportContractAgentServiceCharge>>} Export contract agent service charge entries
 */
const createAgentServiceCharges = async (context: Context, agentServiceIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating exportContractAgentServiceCharges with agent service relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgentServiceCharge.createMany({
      data: agentServiceIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};
export default createAgentServiceCharges;
