import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addApplicationMigratedField
 * Add a migratedV1toV2 field to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addApplicationMigratedField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD migratedV1toV2 to application table';

  const query = `ALTER TABLE Application ADD migratedV1toV2 tinyint(1) DEFAULT NULL`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addApplicationMigratedField;
