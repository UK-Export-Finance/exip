import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer relationship test helper
 * Create a buyer relationship
 * @param {Context} KeystoneJS context API
 * @returns {Object} Created buyer
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a buyer relationship (test helpers)');

    const buyerRelationship = await context.db.BuyerRelationship.createOne({
      data: {},
    });

    return buyerRelationship;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const buyerRelationship = {
  create,
};

export default buyerRelationship;
