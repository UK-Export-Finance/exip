import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllApplications
 * Get all entries in the "Application" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} applications and application ID "connect" relationships
 */
const getAllApplications = async (connection: Connection) => {
  const loggingMessage = 'Getting all applications';

  try {
    const query = 'SELECT * FROM Application';

    const [applications] = await executeSqlQuery({ connection, query, loggingMessage });

    return applications;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllApplications;
