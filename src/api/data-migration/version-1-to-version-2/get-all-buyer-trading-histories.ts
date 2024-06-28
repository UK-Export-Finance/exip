import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllBuyerTradingHistories
 * Get all buyer trading history in the "BuyerTradingHistory" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const getAllBuyerTradingHistories = async (connection: Connection) => {
  const loggingMessage = 'Getting all buyer trading histories';

  const query = 'SELECT * FROM BuyerTradingHistory';

  const [tradingHistories] = await executeSqlQuery({ connection, query, loggingMessage });

  return tradingHistories;
};

export default getAllBuyerTradingHistories;
