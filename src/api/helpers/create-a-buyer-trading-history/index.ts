import { Context } from '../../types';
import { APPLICATION } from '../../constants';

/**
 * createABuyerTradingHistory
 * Create a buyer trading history with buyer relationships.
 * @param {Context} context: KeystoneJS context API
 * @param {string} buyerId: Buyer ID
 * @param {string} applicationId: Application ID
 * @returns {Promise<object>} Created buyer trading history
 */
const createABuyerTradingHistory = async (context: Context, buyerId: string, applicationId: string) => {
  console.info('Creating a buyer trading history for %s', buyerId);

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
  } catch (error) {
    console.error('Error creating a buyer trading history %o', error);

    throw new Error(`Creating a buyer trading history ${error}`);
  }
};

export default createABuyerTradingHistory;
