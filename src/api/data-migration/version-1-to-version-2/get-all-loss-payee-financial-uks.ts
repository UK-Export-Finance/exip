import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllLossPayeeFinancialUk
 * Get all entries in the "LossPayeeFinancialUk" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Loss payee - nominated loss payee - financial UK entries
 */
const getAllLossPayeeFinancialUk = async (connection: Connection) => {
  const loggingMessage = 'Getting all loss payee - financial UK entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM LossPayeeFinancialUk';

    const [exportContracts] = await executeSqlQuery({ connection, query, loggingMessage });

    return exportContracts;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllLossPayeeFinancialUk;
