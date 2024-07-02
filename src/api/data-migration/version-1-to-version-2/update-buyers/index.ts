import { Connection } from 'mysql2/promise';
import moveBuyerContactFields from '../update-applications/move-buyer-contact-fields';
import moveBuyerRelationshipFields from '../update-applications/move-buyer-relationship-fields';
import moveBuyerTradingHistoryFields from '../update-applications/move-buyer-trading-history-fields';
import updateBuyerAddressVarChar from '../update-applications/update-buyer-address-var-char';
import removeBuyerFields from '../update-applications/remove-buyer-fields';
import updateBuyerRelationshipIds from './update-buyer-relationship-ids';
import { ApplicationBuyerMvp } from '../../../types';

/**
 * updateBuyers
 * Move MVP "buyers" fields into the new "No PDF" data model/structure.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} Updated buyers
 */
const updateBuyers = async (connection: Connection, buyers: Array<ApplicationBuyerMvp>) => {
  const loggingMessage = 'Updating buyers';

  console.info(`✅ ${loggingMessage}`);

  try {
    await Promise.all([
      moveBuyerContactFields(buyers, connection),
      moveBuyerRelationshipFields(buyers, connection),
      moveBuyerTradingHistoryFields(buyers, connection),
    ]);

    const updated = await updateBuyerRelationshipIds({ connection, buyers });

    await updateBuyerAddressVarChar(connection);

    await removeBuyerFields(connection);

    return updated;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateBuyers;
