import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryKeys
 * Add declaration and version keys to the DeclarationModernSlavery table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryKeys = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: 'ALTER TABLE DeclarationModernSlavery ADD KEY DeclarationModernSlavery_version_idx (version)',
    loggingMessage: 'Adding KEY version to DeclarationModernSlavery table',
  });

export default addDeclarationModernSlaveryKeys;
