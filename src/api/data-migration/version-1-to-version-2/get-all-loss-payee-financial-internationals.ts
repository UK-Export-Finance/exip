import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllLossPayeeFinancialInternational
 * Get all entries in the "LossPayeeFinancialInternational" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Loss payee - nominated loss payee - financial international entries
 */
const getAllLossPayeeFinancialInternational = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial international entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialInternational';

    const [exportContracts] = await executeSqlQuery({ connection, query, loggingMessage });

    return exportContracts;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllLossPayeeFinancialInternational;
