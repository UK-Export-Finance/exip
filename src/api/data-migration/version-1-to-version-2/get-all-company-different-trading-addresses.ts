import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllCompanyDifferentTradingAddresses
 * Get all entries in the "CompanyDifferentTradingAddress" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Companies
 */
const getAllCompanyDifferentTradingAddresses = async (connection: Connection) => {
  const loggingMessage = 'Getting all company different trading addresses';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM CompanyDifferentTradingAddress';

    const [tradingAddresses] = await executeSqlQuery({ connection, query, loggingMessage });

    return tradingAddresses;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllCompanyDifferentTradingAddresses;
