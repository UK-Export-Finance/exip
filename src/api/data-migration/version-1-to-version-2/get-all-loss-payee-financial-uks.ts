import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllLossPayeeFinancialUk
 * Get all entries in the "LossPayeeFinancialUk" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Loss payee - nominated loss payee - financial UK entries
 */
const getAllLossPayeeFinancialUk = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial UK entries';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialUk';

    const [financials] = await executeSqlQuery({ connection, query, loggingMessage });

    return financials;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllLossPayeeFinancialUk;
