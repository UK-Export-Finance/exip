import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
import getAllBuyers from '../get-all-buyers';
import moveBuyerContactFields from '../update-applications/move-buyer-contact-fields';
import moveBuyerRelationshipFields from '../update-applications/move-buyer-relationship-fields';
import moveBuyerTradingHistoryFields from '../update-applications/move-buyer-trading-history-fields';
import removeBuyerFields from '../update-applications/remove-buyer-fields';
import updateBuyerRelationshipIds from './update-buyer-relationship-ids';

/**
 * updateBuyers
 * Move MVP "buyers" fields into the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @param {Context} context: KeystoneJS context API
 * @returns {Promise<Array<object>>} Updated buyers
 */
const updateBuyers = async (connection: Connection, context: Context) => {
  const loggingMessage = 'Updating buyers';

  console.info(`✅ ${loggingMessage}`);

  try {
    const buyers = await getAllBuyers(connection);

    const buyerContacts = await moveBuyerContactFields(buyers, context);
    const buyerRelationships = await moveBuyerRelationshipFields(buyers, context);
    const buyerTradingHistories = await moveBuyerTradingHistoryFields(buyers, context);

    const updated = await updateBuyerRelationshipIds({
      context,
      buyers,
      buyerContacts,
      buyerRelationships,
      buyerTradingHistories,
    });

    await removeBuyerFields(connection);

    return updated;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateBuyers;
