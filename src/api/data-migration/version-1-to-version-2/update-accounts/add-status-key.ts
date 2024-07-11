import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addStatusKey
 * Add a status key to the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addStatusKey = (connection: Connection) => {
  const loggingMessage = 'Adding KEY status to account table';

  const query = `
    ALTER TABLE Account ADD KEY Account_status_idx (status)
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addStatusKey;
