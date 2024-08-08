import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationExportContractAgent } from '../types';

/**
 * Create an export contract agent test helper
 * Create an export contract agent
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationExportContractAgent} data
 * @returns {ApplicationExportContractAgent} Created export contract agent
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating an exportContractAgent (test helpers)');

    const agent = (await context.query.ExportContractAgent.createOne({ data })) as ApplicationExportContractAgent;

    return agent;
  } catch (error) {
    console.error(error);
    return error;
  }
};

/**
 * Get export contract agent test helper
 * Get an export contract agent by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} exportContractAgentId: Export contract agent ID
 * @returns {Promise<ApplicationExportContractAgent>} Export contract agent
 */
const get = async (context: Context, agentId: string) => {
  try {
    console.info('Getting an exportContractAgent by ID (test helpers)');

    const agent = await context.db.ExportContractAgent.findOne({
      where: { id: agentId },
    });

    return agent;
  } catch (error) {
    console.error(error);
    throw new Error(`Getting an exportContractAgent by ID (test helpers) ${error}`);
  }
};

const exportContractAgent = {
  create,
  get,
};

export default exportContractAgent;
