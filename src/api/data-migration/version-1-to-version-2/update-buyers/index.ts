import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
import getAllBuyers from '../get-all-buyers';
import { moveBuyerContactFields, moveBuyerRelationshipFields, moveBuyerTradingHistoryFields } from '../update-applications/move-buyer-contact-fields';
import removeBuyerFields from '../update-applications/remove-buyer-fields';

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

    const updatedBuyers = await Promise.all([
      moveBuyerContactFields(buyers, context),
      moveBuyerRelationshipFields(buyers, context),
      moveBuyerTradingHistoryFields(buyers, context),
      removeBuyerFields(connection),
    ]);

    return updatedBuyers;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateBuyers;
