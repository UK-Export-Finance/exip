import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * create buyer test helper
 * Create a buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} context: KeystoneJS context API, buyer data
 * @param {ApplicationBuyerTradingHistory} data
 * @returns {object} Created buyer trading history
 */
const create = async (context: Context, data = {}) => {
  try {
    console.info('Creating a buyerTradingHistory (test helpers)');

    const buyer = await context.query.BuyerTradingHistory.createOne({
      data,
    });

    return buyer;
  } catch (error) {
    console.error('Error creating a buyerTradingHistory (test helpers) %o', error);

    return error;
  }
};

const buyerTradingHistory = {
  create,
};

export default buyerTradingHistory;
