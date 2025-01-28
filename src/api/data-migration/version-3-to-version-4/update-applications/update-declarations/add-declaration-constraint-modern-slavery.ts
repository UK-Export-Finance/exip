import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationConstraintModernSlavery
 * Add a modernSlavery constraint to the Declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationConstraintModernSlavery = async (connection: Connection) =>
  executeSqlQuery({
    connection,
    query:
      'ALTER TABLE Declaration ADD CONSTRAINT Declaration_modernSlavery_fkey FOREIGN KEY (modernSlavery) REFERENCES DeclarationModernSlavery (id) ON DELETE SET NULL ON UPDATE CASCADE',
    loggingMessage: 'Adding CONSTRAINT modernSlavery to Declaration table',
  });

export default addDeclarationConstraintModernSlavery;
