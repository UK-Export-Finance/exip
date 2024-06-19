import { Context } from '.keystone/types';
import { APPLICATION } from '../../constants';

/**
 * createABuyerTradingHistory
 * Create a buyer trading history with buyer relationships.
 * @param {Context} KeystoneJS context API
 * @param {String} buyerId: Buyer ID
 * @param {String} applicationId: Application ID
 * @returns {Promise<Object>} Created buyer trading history
 */
const createABuyerTradingHistory = async (context: Context, buyerId: string, applicationId: string) => {
  console.info('Creating a buyer trading history for ', buyerId);

  try {
    const buyerTradingHistory = await context.db.BuyerTradingHistory.createOne({
      data: {
        buyer: {
          connect: {
            id: buyerId,
          },
        },
        application: {
          connect: {
            id: applicationId,
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
