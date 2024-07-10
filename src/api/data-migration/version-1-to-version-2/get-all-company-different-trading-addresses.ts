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

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM CompanyDifferentTradingAddress';

    const [tradingAddresses] = await executeSqlQuery({ connection, query, loggingMessage });

    return tradingAddresses;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllCompanyDifferentTradingAddresses;
