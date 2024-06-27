import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * createInitialAgents
 * Create new "export contract agent" entires
 * @param {Context} context: KeystoneJS context API
 * @param {Array<object>} exportContractIdsConnectArray: Array of export contract IDs "connect" objects
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const createInitialAgents = async (context: Context, exportContractIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating initial exportContractAgents with export contract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgent.createMany({
      data: exportContractIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createInitialAgents;
