import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationExportContract } from '../types';

/**
 * Create an export contract test helper
 * Create an export contract
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationExportContract} data
 * @returns {ApplicationExportContract} Created export contract
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating an exportContract (test helpers)');

    const exportContract = (await context.query.ExportContract.createOne({ data })) as ApplicationExportContract;

    return exportContract;
  } catch (error) {
    console.error('Error creating an exportContract (test helpers) %o', error);

    return error;
  }
};

/**
 * Get export contract test helper
 * Get an export contract by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} exportContractId: Export contract ID
 * @returns {Promise<ApplicationExportContract>} Export contract
 */
const get = async (context: Context, exportContractId: string) => {
  try {
    console.info('Getting an exportContract by ID (test helpers)');

    const exportContract = await context.db.ExportContract.findOne({
      where: { id: exportContractId },
    });

    return exportContract;
  } catch (error) {
    console.error('Error getting an exportContract by ID (test helpers) %o', error);

    throw new Error(`Getting an exportContract by ID (test helpers) ${error}`);
  }
};

const exportContract = {
  create,
  get,
};

export default exportContract;
