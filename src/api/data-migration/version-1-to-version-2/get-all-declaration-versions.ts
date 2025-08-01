import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllDeclarationVersions
 * Get all entries in the "DeclarationVersion" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} Declaration versions
 */
const getAllDeclarationVersions = async (connection: Connection) => {
  const loggingMessage = 'Getting all declaration versions';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM DeclarationVersion';

    const [declarationVersions] = await executeSqlQuery({ connection, query, loggingMessage });

    return declarationVersions;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllDeclarationVersions;
