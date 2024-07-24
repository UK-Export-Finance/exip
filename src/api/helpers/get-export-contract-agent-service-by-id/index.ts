import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getExportContractAgentServiceById
 * Get an export contract agent service by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: ExportContractAgentService ID
 * @returns {Promise<ApplicationExportContractAgentService>}
 */
const getExportContractAgentServiceById = async (context: Context, id: string) => {
  try {
    console.info(`Getting exportContractAgentService by ID ${id}`);

    const exportContractAgentService = await context.db.ExportContractAgentService.findOne({
      where: { id },
    });

    return exportContractAgentService;
  } catch (err) {
    console.error(`Getting exportContractAgentService by ID ${id} %O`, err);

    throw new Error(`Error Getting exportContractAgentService by ID ${id} ${err}`);
  }
};

export default getExportContractAgentServiceById;
