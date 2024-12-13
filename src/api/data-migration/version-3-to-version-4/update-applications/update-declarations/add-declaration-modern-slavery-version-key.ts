import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryVersionKey
 * Add a declarationModernSlavery key to the DeclarationModernSlaveryVersion table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryVersionKey = async (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: 'ALTER TABLE DeclarationModernSlaveryVersion ADD KEY DeclarationModernSlaveryVersion_declarationModernSlavery_idx(declarationModernSlavery)',
    loggingMessage: 'Adding KEY declarationModernSlavery to DeclarationModernSlaveryVersion table',
  });

export default addDeclarationModernSlaveryVersionKey;
