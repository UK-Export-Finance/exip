import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationExportContractAgentServiceCharge } from '../types';

/**
 * Create an export contract agent service charge test helper
 * Create an export contract agent service charge
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationExportContractAgentService} data
 * @returns {ApplicationExportContractAgentServiceCharge} Created export contract agent service charge
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a exportContractAgentServiceCharge (test helpers)');

    const serviceCharge = (await context.query.ExportContractAgentServiceCharge.createOne({ data })) as ApplicationExportContractAgentServiceCharge;

    return serviceCharge;
  } catch (error) {
    console.error(error);

    return error;
  }
};

/**
 * Get export contract agent service charge test helper
 * Get an export contract agent service charge by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} chargeId: Export contract agent service charge ID
 * @returns {Promise<ApplicationExportContractAgentServiceCharge>} Export contract agent service charge
 */
const get = async (context: Context, chargeId: string) => {
  try {
    console.info('Getting an exportContractAgentServiceCharge by ID (test helpers)');

    const serviceCharge = await context.db.ExportContractAgentServiceCharge.findOne({
      where: { id: chargeId },
    });

    return serviceCharge;
  } catch (error) {
    console.error(error);

    throw new Error(`Getting an exportContractAgentServiceCharge by ID (test helpers) ${error}`);
  }
};

const exportContractAgent = {
  create,
  get,
};

export default exportContractAgent;
