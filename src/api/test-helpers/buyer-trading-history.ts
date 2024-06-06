import { ApplicationBuyer, BuyerTradingHistory, TestHelperBuyerCreate } from '../types';

/**
 * create buyer test helper
 * Create an buyer with mock buyer data and any provied custom buyer data.
 * @param {Context} KeystoneJS context API, buyer data
 * @returns {Object} Created buyer
 */
const create = async ({ context, data }: TestHelperBuyerCreate): Promise<BuyerTradingHistory> => {
  try {
    console.info('Creating a buyerTradingHistory (test helpers)');

    const buyer = (await context.query.BuyerTradingHistory.createOne({
      data,
    })) as ApplicationBuyer;

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
