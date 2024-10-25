import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllLossPayeeFinancialInternationalVectors
 * Get all entries in the "LossPayeeFinancialInternationalVector" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Loss payee - nominated loss payee - financial international vector entries
 */
const getAllLossPayeeFinancialInternationalVectors = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial international vector entries';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialInternationalVector';

    const [vectors] = await executeSqlQuery({ connection, query, loggingMessage });

    return vectors;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllLossPayeeFinancialInternationalVectors;
