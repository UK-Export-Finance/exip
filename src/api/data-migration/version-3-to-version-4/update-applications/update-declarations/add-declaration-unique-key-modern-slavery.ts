import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../../execute-sql-query';

/**
 * addDeclarationUniqueKeyModernSlavery
 * Add a modernSlavery unique key to the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationUniqueKeyModernSlavery = (connection: Connection) => {
  const loggingMessage = 'Adding UNIQUE KEY modernSlavery to declaration table';

  const query = `
    ALTER TABLE Declaration ADD UNIQUE KEY Declaration_modernSlavery_key (modernSlavery)
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addDeclarationUniqueKeyModernSlavery;
