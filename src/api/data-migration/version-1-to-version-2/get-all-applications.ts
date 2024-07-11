import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllApplications
 * Get all entries in the "Application" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} applications and application ID "connect" relationships
 */
const getAllApplications = async (connection: Connection) => {
  const loggingMessage = 'Getting all applications';

  try {
    const query = 'SELECT * FROM Application';

    const [applications] = await executeSqlQuery({ connection, query, loggingMessage });

    return applications;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllApplications;
