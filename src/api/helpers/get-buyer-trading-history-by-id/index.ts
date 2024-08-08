import { Context } from '.keystone/types'; // eslint-disable-line

/**
 * getBuyerTradingHistoryById
 * Get a buyer trading history by ID
 * @param {Context} context: KeystoneJS context API
 * @param {String} id: Buyer trading history ID
 * @returns {Promise<ApplicationBuyerTradingHistory>}
 */
const getBuyerTradingHistoryById = async (context: Context, id: string) => {
  try {
    console.info(`Getting buyer trading history by ID ${id}`);

    const buyerTradingHistory = await context.db.BuyerTradingHistory.findOne({
      where: { id },
    });

    return buyerTradingHistory;
  } catch (error) {
    console.error(`Getting buyer trading history by ID ${id} %O`, error);

    throw new Error(`Error Getting buyer trading history by ID ${id} ${error}`);
  }
};

export default getBuyerTradingHistoryById;
