import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer relationship test helper
 * Create a buyer relationship
 * @param {Context} context: KeystoneJS context API
 * @param {ApplicationBuyerRelationship} data
 * @returns {Object} Created buyer relationship
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a buyer relationship (test helpers)');

    const buyerRelationship = await context.db.BuyerRelationship.createOne({
      data,
    });

    return buyerRelationship;
  } catch (error) {
    console.error('Error creating a buyer relationship (test helpers)');

    return error;
  }
};

const buyerRelationship = {
  create,
};

export default buyerRelationship;
