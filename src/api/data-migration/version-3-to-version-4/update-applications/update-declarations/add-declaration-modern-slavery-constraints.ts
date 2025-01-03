import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryConstraints
 * - Add a modernSlavery constraint to the Declaration table.
 * - Add a declaration constraint to the DeclarationModernSlavery table.
 * - Add a version constraint to the DeclarationModernSlavery table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryConstraints = async (connection: Connection) => {
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE DeclarationModernSlavery ADD CONSTRAINT DeclarationModernSlavery_version_fkey FOREIGN KEY(version) REFERENCES DeclarationModernSlaveryVersion(id) ON DELETE SET NULL ON UPDATE CASCADE`,
      loggingMessage: 'Adding CONSTRAINT version to DeclarationModernSlavery table',
    }),
  ]);

  return queries;
};

export default addDeclarationModernSlaveryConstraints;


// executeSqlQuery({
  // connection,
  // query: `ALTER TABLE Declaration ADD CONSTRAINT Declaration_modernSlavery_fkey FOREIGN KEY (modernSlavery) REFERENCES DeclarationModernSlavery (id) ON DELETE SET NULL ON UPDATE CASCADE`,
  // loggingMessage: 'Adding CONSTRAINT modernSlavery to Declaration table',
// }),
// executeSqlQuery({
  // connection,
  // query: `ALTER TABLE DeclarationModernSlavery ADD CONSTRAINT DeclarationModernSlavery_version_fkey FOREIGN KEY (version) REFERENCES DeclarationModernSlavery (id) ON DELETE SET NULL ON UPDATE CASCADE`,
  // loggingMessage: 'Adding CONSTRAINT version to DeclarationModernSlavery table',
// }),
