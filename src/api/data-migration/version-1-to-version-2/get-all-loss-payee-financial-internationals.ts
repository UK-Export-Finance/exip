import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllLossPayeeFinancialInternational
 * Get all entries in the "LossPayeeFinancialInternational" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} Loss payee - nominated loss payee - financial international entries
 */
const getAllLossPayeeFinancialInternational = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial international entries';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialInternational';

    const [financials] = await executeSqlQuery({ connection, query, loggingMessage });

    return financials;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllLossPayeeFinancialInternational;
