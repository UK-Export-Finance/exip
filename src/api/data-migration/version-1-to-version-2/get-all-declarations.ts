import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';
import { ApplicationDeclaration } from '../../types';

/**
 * getAllDeclarations
 * Get all entries in the "Declaration" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<ApplicationDeclaration>} Declarations
 */
const getAllDeclarations = async (connection: Connection) => {
  const loggingMessage = 'Getting all declarations';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM Declaration';

    const [declarations] = await executeSqlQuery({ connection, query, loggingMessage });

    return declarations as Array<ApplicationDeclaration>;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllDeclarations;
