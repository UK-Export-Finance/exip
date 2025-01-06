import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryConstraint
 * Add a modernSlavery version constraint to the Declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryConstraint = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: `ALTER TABLE DeclarationModernSlavery ADD CONSTRAINT DeclarationModernSlavery_version_fkey FOREIGN KEY(version) REFERENCES DeclarationModernSlaveryVersion(id) ON DELETE SET NULL ON UPDATE CASCADE`,
    loggingMessage: 'Adding CONSTRAINT version to DeclarationModernSlavery table',
  });

export default addDeclarationModernSlaveryConstraint;
