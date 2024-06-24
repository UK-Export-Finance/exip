import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationBuyerMvp } from '../../../types';

/**
 * moveBuyerTradingHistoryFields
 * Move MVP "buyer trading history" fields into the new "No PDF" data model/structure.
 * NOTE: The buyer data we receive is raw database data.
 * In the database, boolean fields are TINYINT/integer values.
 * The KeystoneJS context/GraphQL API expects these fields to be booleans.
 * Therefore, since the TINYINT values will be 0 or 1,
 * we can safely transform any TINYINT fields to have a boolean value.
 * KeystoneJS will then automatically handle saving in the database as a TINYINT
 * @param {Array<ApplicationBuyerMvp>} context: KeystoneJS context API
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Array<ApplicationBuyer>>} Updated buyers
 */
const moveBuyerTradingHistoryFields = async (buyers: Array<ApplicationBuyerMvp>, context: Context) => {
  const mappedBuyerTradingHistoryData = buyers.map((buyer: ApplicationBuyerMvp) => {
    const mapped = {
      application: {
        connect: {
          id: buyer.application,
        },
      },
      exporterHasTradedWithBuyer: Boolean(buyer.exporterHasTradedWithBuyer),
    };

    return mapped;
  });

  const created = await context.db.BuyerTradingHistory.createMany({
    data: mappedBuyerTradingHistoryData,
  });

  return created;
};

export default moveBuyerTradingHistoryFields;
