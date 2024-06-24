import { Context } from '.keystone/types'; // eslint-disable-line
import { ApplicationBuyerMvp } from '../../../types';

/**
 * getObjectByApplicationId
 * Get an object with a matching application ID
 * @param {Array} arr: Array of objects
 * @param {String} id: Application ID
 * @returns {object} Object with a matching application ID
 */
const getObjectByApplicationId = (arr: Array<object>, id: string) => arr.find((obj) => obj.applicationId === id);

interface CreateBuyerRelationshipsParams {
  context: Context;
  buyers: Array<ApplicationBuyerMvp>;
  buyerContacts: Array<object>;
  buyerRelationships: Array<object>;
  buyerTradingHistories: Array<object>;
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
 * @param {Context} context: KeystoneJS context API
 * @param {Array<ApplicationBuyerMvp>} buyers: buyer
 * @returns {Promise<Array<Application>>} Updated applications
 */
const updateBuyerRelationshipIds = async ({ context, buyers, buyerContacts, buyerRelationships, buyerTradingHistories }: CreateBuyerRelationshipsParams) => {
  const loggingMessage = 'Updating buyers to have trading history, contact and relationship IDs';

  try {
    console.info(`✅ ${loggingMessage}`);

    const buyerUpdates = buyers.map((buyer) => {
      const { application: applicationId } = buyer;

      const contact = getObjectByApplicationId(buyerContacts, applicationId);
      const relationship = getObjectByApplicationId(buyerRelationships, applicationId);
      const tradingHistory = getObjectByApplicationId(buyerTradingHistories, applicationId);

      return {
        where: { id: buyer.id },
        data: {
          buyerTradingHistory: {
            connect: {
              id: tradingHistory.id,
            },
          },
          contact: {
            connect: {
              id: contact.id,
            },
          },
          relationship: {
            connect: {
              id: relationship.id,
            },
          },
        },
      };
    });

    const updated = await context.db.Buyer.updateMany({
      data: buyerUpdates,
    });

    return updated;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateBuyerRelationshipIds;
