import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getExportContractAgentById
 * Get an export contract agent by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: ExportContractAgent ID
 * @returns {Promise<ApplicationExportContractAgent>}
 */
const getExportContractAgentById = async (context: Context, id: string) => {
  try {
    console.info(`Getting exportContractAgent by ID ${id}`);

    const exportContractAgent = await context.db.ExportContractAgent.findOne({
      where: { id },
    });

    return exportContractAgent;
  } catch (error) {
    console.error(`Getting exportContractAgent by ID ${id} %O`, error);

    throw new Error(`Error Getting exportContractAgent by ID ${id} ${error}`);
  }
};

export default getExportContractAgentById;
