import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllCompanies
 * Get all entries in the "Company" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} Companies
 */
const getAllCompanies = async (connection: Connection) => {
  const loggingMessage = 'Getting all companies';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM Company';

    const [companies] = await executeSqlQuery({ connection, query, loggingMessage });

    return companies;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllCompanies;
