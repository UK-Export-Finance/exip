import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addStatusConstraint
 * Add a status constraint to the account table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addStatusConstraint = (connection: Connection) => {
  const loggingMessage = 'Adding CONSTRAINT status to account table';

  const query = `
    ALTER TABLE Account ADD CONSTRAINT Account_status_fkey FOREIGN KEY (status) REFERENCES AccountStatus (id) ON DELETE SET NULL ON UPDATE CASCADE
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addStatusConstraint;
