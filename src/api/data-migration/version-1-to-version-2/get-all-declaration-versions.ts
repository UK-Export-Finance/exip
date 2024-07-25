import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllDeclarationVersions
 * Get all entries in the "DeclarationVersion" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Declaration versions
 */
const getAllDeclarationVersions = async (connection: Connection) => {
  const loggingMessage = 'Getting all declaration versions';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM DeclarationVersion';

    const [exportContracts] = await executeSqlQuery({ connection, query, loggingMessage });

    return exportContracts;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllDeclarationVersions;
