import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getTotalContractValueById
 * Get a total contract value by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: TotalContractValue ID
 * @returns {Promise<TotalContractValue>}
 */
const getTotalContractValueById = async (context: Context, id: string) => {
  try {
    console.info('Getting totalContractValue by ID %s', id);

    const totalContractValue = await context.db.TotalContractValue.findOne({
      where: { id },
    });

    return totalContractValue;
  } catch (error) {
    console.error('Getting totalContractValue by ID %s %o', id, error);

    throw new Error(`Error Getting totalContractValue by ID ${id} ${error}`);
  }
};

export default getTotalContractValueById;
