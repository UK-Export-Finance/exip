import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllLossPayeeFinancialUkVectors
 * Get all entries in the "LossPayeeFinancialUkVector" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} Loss payee - nominated loss payee - financial UK vector entries
 */
const getAllLossPayeeFinancialUkVectors = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial UK vector entries';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialUkVector';

    const [vectors] = await executeSqlQuery({ connection, query, loggingMessage });

    return vectors;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllLossPayeeFinancialUkVectors;
