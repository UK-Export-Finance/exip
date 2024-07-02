import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllPrivateMarkets
 * Get all entries in the "PrivateMarket" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Private markets
 */
const getAllPrivateMarkets = async (connection: Connection) => {
  const loggingMessage = 'Getting all private markets';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM PrivateMarket';

    const [privateMarkets] = await executeSqlQuery({ connection, query, loggingMessage });

    return privateMarkets;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllPrivateMarkets;
