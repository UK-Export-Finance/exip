import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBuyerRelationshipById
 * Get a buyer relationship by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Buyer relationship ID
 * @returns {Promise<ApplicationBuyerRelationship>}
 */
const getBuyerRelationshipById = async (context: Context, id: string) => {
  try {
    console.info(`Getting buyer relationship by ID ${id}`);

    const buyerRelationship = await context.db.BuyerRelationship.findOne({
      where: { id },
    });

    return buyerRelationship;
  } catch (err) {
    console.error(`Getting buyer relationship by ID ${id} %O`, err);

    throw new Error(`Error Getting buyer relationship by ID ${id} ${err}`);
  }
};

export default getBuyerRelationshipById;
