import { Context } from '../../types';
import { APPLICATION } from '../../constants';

/**
 * createABuyerTradingHistory
 * Create a buyer trading history with buyer relationships.
 * @param {Object} KeystoneJS context API
 * @param {String} buyerId
 * @returns {Object} Created buyer trading history
 */
const createABuyerTradingHistory = async (context: Context, buyerId: string) => {
  console.info('Creating a buyer trading history for ', buyerId);

  try {
    const buyerTradingHistory = await context.db.BuyerTradingHistory.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        currencyCode: APPLICATION.DEFAULT_CURRENCY,
      },
    });

    return buyerTradingHistory;
  } catch (err) {
    console.error('Error creating a buyer trading history %O', err);

    throw new Error(`Creating a buyer trading history ${err}`);
  }
};

export default createABuyerTradingHistory;
