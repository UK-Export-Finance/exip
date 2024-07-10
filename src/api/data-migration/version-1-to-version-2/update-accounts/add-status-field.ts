import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addStatusField
 * Add a status field to the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addStatusField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD status to account table';

  const query = `
    ALTER TABLE Account ADD status varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addStatusField;
