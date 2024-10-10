import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getExportContractAgentServiceChargeById
 * Get an export contract agent service charge by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: ExportContractAgentServiceCharge ID
 * @returns {Promise<ApplicationExportContractAgentServiceCharge>}
 */
const getExportContractAgentServiceChargeById = async (context: Context, id: string) => {
  try {
    console.info('Getting exportContractAgentServiceCharge by ID %s', id);

    const exportContractAgentServiceCharge = await context.db.ExportContractAgentServiceCharge.findOne({
      where: { id },
    });

    return exportContractAgentServiceCharge;
  } catch (error) {
    console.error('Getting exportContractAgentServiceCharge by ID %s %o', id, error);

    throw new Error(`Error Getting exportContractAgentServiceCharge by ID ${id} ${error}`);
  }
};

export default getExportContractAgentServiceChargeById;
