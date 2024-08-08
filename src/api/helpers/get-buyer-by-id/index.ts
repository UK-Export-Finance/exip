import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBuyerById
 * Get a buyer by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Buyer ID
 * @returns {Promise<ApplicationBuyer>}
 */
const getBuyerById = async (context: Context, id: string) => {
  try {
    console.info('Getting buyer by ID %s', id);

    const buyer = await context.db.Buyer.findOne({
      where: { id },
    });

    return buyer;
  } catch (error) {
    console.error('Getting buyer by ID %s %O', id, error);

    throw new Error(`Error Getting buyer by ID ${id} ${error}`);
  }
};

export default getBuyerById;
