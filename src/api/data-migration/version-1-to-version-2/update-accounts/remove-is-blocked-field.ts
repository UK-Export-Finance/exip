import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeIsBlockedField
 * Remove the isBlocked field from the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeIsBlockedField = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD isBlocked from account table';

  const query = `
    ALTER TABLE Account DROP COLUMN isBlocked
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeIsBlockedField;
