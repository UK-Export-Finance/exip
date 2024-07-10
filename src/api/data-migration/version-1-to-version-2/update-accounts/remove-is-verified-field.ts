import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeIsVerifiedField
 * Remove the isVerified field from the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeIsVerifiedField = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD isVerified from account table';

  const query = `
    ALTER TABLE Account DROP COLUMN isVerified
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeIsVerifiedField;
