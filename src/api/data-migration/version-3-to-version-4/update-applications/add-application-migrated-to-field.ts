import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addMigratedToField
 * Add a migratedTo field to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addMigratedToField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD migratedTo to application table';

  const query = `ALTER TABLE Application ADD migratedTo int DEFAULT NULL`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addMigratedToField;
