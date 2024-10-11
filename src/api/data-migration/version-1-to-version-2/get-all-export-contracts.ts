import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllExportContracts
 * Get all entries in the "ExportContract" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Export contracts
 */
const getAllExportContracts = async (connection: Connection) => {
  const loggingMessage = 'Getting all export contracts';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM ExportContract';

    const [exportContracts] = await executeSqlQuery({ connection, query, loggingMessage });

    return exportContracts;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllExportContracts;
