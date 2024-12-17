import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addMigratedV3toV4Field
 * Add a migratedV3toV4 field to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addMigratedV3toV4Field = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD migratedV3toV4 to application table';

  const query = `ALTER TABLE Application ADD migratedV3toV4 tinyint(1) DEFAULT NULL`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addMigratedV3toV4Field;
