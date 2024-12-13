import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationModernSlaveryField
 * Add a modernSlavery field to the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationModernSlaveryField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD modernSlavery to declaration table';

  const query = `
    ALTER TABLE Declaration ADD modernSlavery varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addDeclarationModernSlaveryField;
