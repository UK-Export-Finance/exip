import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addStatusUniqueKey
 * Add a status unique key to the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addStatusUniqueKey = (connection: Connection) => {
  const loggingMessage = 'Adding UNIQUE KEY status to account table';

  const query = `
    ALTER TABLE Account ADD UNIQUE KEY Account_status_key (status)
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addStatusUniqueKey;
