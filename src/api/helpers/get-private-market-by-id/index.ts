import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getPrivateMarketById
 * Get a private market by ID
 * @param {Context} context: KeystoneJS context API
 * @param {string} id: PrivateMarket ID
 * @returns {Promise<ApplicationPrivateMarket>}
 */
const getPrivateMarketById = async (context: Context, id: string) => {
  try {
    console.info('Getting privateMarket by ID %s', id);

    const privateMarket = await context.db.PrivateMarket.findOne({
      where: { id },
    });

    return privateMarket;
  } catch (error) {
    console.error('Getting privateMarket by ID %s %o', id, error);

    throw new Error(`Error Getting privateMarket by ID ${id} ${error}`);
  }
};

export default getPrivateMarketById;
