import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getTotalContractValueById
 * Get a total contract value by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: TotalContractValue ID
 * @returns {Promise<TotalContractValue>}
 */
const getTotalContractValueById = async (context: Context, id: string) => {
  try {
    console.info(`Getting totalContractValue by ID ${id}`);

    const totalContractValue = await context.db.TotalContractValue.findOne({
      where: { id },
    });

    return totalContractValue;
  } catch (err) {
    console.error(`Getting totalContractValue by ID ${id} %O`, err);

    throw new Error(`Error Getting totalContractValue by ID ${id} ${err}`);
  }
};

export default getTotalContractValueById;
