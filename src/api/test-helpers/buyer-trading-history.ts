import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer test helper
 * Create a buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} KeystoneJS context API, buyer data
 * @returns {Object} Created buyer
 */
const create = async (context: Context) => {
  try {
    console.info('Creating a buyerTradingHistory (test helpers)');

    const buyer = await context.query.BuyerTradingHistory.createOne({
      data: { },
    });

    return buyer;
  } catch (err) {
    console.error(err);
    return err;
  }
};

const buyerTradingHistory = {
  create,
};

export default buyerTradingHistory;
