import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer test helper
 * Create a buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} context: KeystoneJS context API, buyer data
 * @param {ApplicationBuyer} data
 * @returns {Object} Created buyer
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a buyer (test helpers)');

    const buyer = await context.db.Buyer.createOne({
      data,
    });

    return buyer;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const buyer = {
  create,
};

export default buyer;
