import { Context } from '.keystone/types'; // eslint-disable-line
import { Connection } from 'mysql2/promise';
import getAllBuyers from '../get-all-buyers';
import { moveBuyerContactFields, moveBuyerRelationshipFields, moveBuyerTradingHistoryFields, removeBuyerFields } from '../update-applications';

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
