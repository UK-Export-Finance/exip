import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllDeclarations
 * Get all entries in the "Declaration" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Declarations
 */
const getAllDeclarations = async (connection: Connection) => {
  const loggingMessage = 'Getting all declarations';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM Declaration';

    const [exportContracts] = await executeSqlQuery({ connection, query, loggingMessage });

    return exportContracts;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllDeclarations;
