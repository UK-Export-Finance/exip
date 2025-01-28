import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationExportContractAgentService } from '../types';

/**
 * Create an export contract agent service test helper
 * Create an export contract agent service
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationExportContractAgentService} data
 * @returns {ApplicationExportContractAgentService} Created export contract agent service
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating an exportContractAgentService (test helpers)');

    const agentService = (await context.query.ExportContractAgentService.createOne({ data })) as ApplicationExportContractAgentService;

    return agentService;
  } catch (error) {
    console.error('Error creating an exportContractAgentService (test helpers)');

    return error;
  }
};

/**
 * Get export contract agent service test helper
 * Get an export contract agent service by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} serviceId: Export contract agent service ID
 * @returns {Promise<ApplicationExportContractAgentService>} Export contract agent service
 */
const get = async (context: Context, serviceId: string) => {
  try {
    console.info('Getting an exportContractAgentService by ID (test helpers)');

    const agentService = await context.db.ExportContractAgentService.findOne({
      where: { id: serviceId },
    });

    return agentService;
  } catch (error) {
    console.error('Error getting an exportContractAgentService by ID (test helpers)');

    throw new Error(`Getting an exportContractAgentService by ID (test helpers) ${error}`);
  }
};

const exportContractAgent = {
  create,
  get,
};

export default exportContractAgent;
