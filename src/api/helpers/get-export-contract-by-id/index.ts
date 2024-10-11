import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getExportContractById
 * Get an export contract by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: ExportContract ID
 * @returns {Promise<ApplicationExportContract>}
 */
const getExportContractById = async (context: Context, id: string) => {
  try {
    console.info('Getting exportContract by ID %s', id);

    const exportContract = await context.db.ExportContract.findOne({
      where: { id },
    });

    return exportContract;
  } catch (error) {
    console.error('Getting exportContract by ID %s %o', id, error);

    throw new Error(`Error Getting exportContract by ID ${id} ${error}`);
  }
};

export default getExportContractById;
