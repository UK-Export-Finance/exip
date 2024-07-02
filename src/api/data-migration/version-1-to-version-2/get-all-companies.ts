import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllCompanies
 * Get all entries in the "Company" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Companies
 */
const getAllCompanies = async (connection: Connection) => {
  const loggingMessage = 'Getting all companies';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM Company';

    const [companies] = await executeSqlQuery({ connection, query, loggingMessage });

    return companies;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllCompanies;
