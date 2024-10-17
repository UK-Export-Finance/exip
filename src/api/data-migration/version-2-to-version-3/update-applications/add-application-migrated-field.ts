import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * addApplicationMigratedField
 * Add a migratedV2toV3 field to the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addApplicationMigratedField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD migratedV2toV3 to application table';

  const query = `ALTER TABLE Application ADD migratedV2toV3 tinyint(1) DEFAULT NULL`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addApplicationMigratedField;
