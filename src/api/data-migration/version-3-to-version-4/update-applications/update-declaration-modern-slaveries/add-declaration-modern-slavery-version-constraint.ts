import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryVersionConstraint
 * Add a declarationModernSlavery constraint to the DeclarationModernSlaveryVersion table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryVersionConstraint = async (connection: Connection) =>
  executeSqlQuery({
    connection,
    query:
      'ALTER TABLE DeclarationModernSlaveryVersion ADD CONSTRAINT DeclarationModernSlaveryVersion_declarationModernSlavery_fkey FOREIGN KEY(declarationModernSlavery) REFERENCES DeclarationModernSlavery(id) ON DELETE SET NULL ON UPDATE CASCADE',
    loggingMessage: 'Adding CONSTRAINT declarationModernSlavery to DeclarationModernSlaveryVersion table',
  });

export default addDeclarationModernSlaveryVersionConstraint;
