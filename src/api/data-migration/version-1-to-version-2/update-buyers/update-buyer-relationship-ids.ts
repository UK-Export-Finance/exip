import { Connection } from 'mysql2/promise';
import getAllBuyerContacts from '../get-all-buyer-contacts';
import getAllBuyerRelationships from '../get-all-buyer-relationships';
import getAllBuyerTradingHistories from '../get-all-buyer-trading-histories';
import executeSqlQuery from '../execute-sql-query';
import { ApplicationBuyerMvp } from '../../../types';

/**
 * getObjectByApplicationId
 * Get an object with a matching application ID
 * @param {Array} arr: Array of objects
 * @param {String} id: Application ID
 * @returns {object} Object with a matching application ID
 */
const getObjectByApplicationId = (arr: Array<object>, id: string) => arr.find((obj) => obj.application === id);

interface CreateBuyerRelationshipsParams {
  connection: Connection;
  buyers: Array<ApplicationBuyerMvp>;
}

/**
 * updateBuyerRelationshipIds
 * Update buyer's to have relationship IDs for the following:
 * - Buyer contact
 * - Buyer relationship
 * - Buyer trading history
 * 1) For each provided buyer, get the relevant contact, relationship and trading history, with a matching application ID.
 * 2) Generate an array of objects with the buyer ID and relevant relationships.
 * 3) Update the buyers with the generated array.
 * @param {Connection} connection: SQL database connection
 * @param {Array<ApplicationBuyerMvp>} buyers: buyer
 * @returns {Promise<Array<Application>>} Updated applications
 */
const updateBuyerRelationshipIds = async ({ connection, buyers }: CreateBuyerRelationshipsParams) => {
  const loggingMessage = 'Updating buyers to have trading history, contact and relationship IDs';

  try {
    console.info(`✅ ${loggingMessage}`);

    const [buyerContacts, buyerRelationships, buyerTradingHistories] = await Promise.all([
      await getAllBuyerContacts(connection),
      await getAllBuyerRelationships(connection),
      await getAllBuyerTradingHistories(connection),
    ]);

    const buyerPromises = buyers.map(async (buyer: ApplicationBuyerMvp) => {
      const { application } = buyer;

      const buyerLoggingMessage = `Creating new buyer trading history relationships for buyer ${buyer.id}`;

      const contact = getObjectByApplicationId(buyerContacts, application);
      const relationship = getObjectByApplicationId(buyerRelationships, application);
      const tradingHistory = getObjectByApplicationId(buyerTradingHistories, application);

      const query = `
        UPDATE Buyer SET buyerTradingHistory='${tradingHistory.id}', contact='${contact.id}', relationship='${relationship.id}' WHERE id='${buyer.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: buyerLoggingMessage,
      });

      return updated;
    });

    return Promise.all(buyerPromises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateBuyerRelationshipIds;
