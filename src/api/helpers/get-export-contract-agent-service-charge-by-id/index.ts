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
    console.info(`Getting exportContractAgentServiceCharge by ID ${id}`);

    const exportContractAgentServiceCharge = await context.db.ExportContractAgentServiceCharge.findOne({
      where: { id },
    });

    return exportContractAgentServiceCharge;
  } catch (err) {
    console.error(`Getting exportContractAgentServiceCharge by ID ${id} %O`, err);

    throw new Error(`Error Getting exportContractAgentServiceCharge by ID ${id} ${err}`);
  }
};

export default getExportContractAgentServiceChargeById;
