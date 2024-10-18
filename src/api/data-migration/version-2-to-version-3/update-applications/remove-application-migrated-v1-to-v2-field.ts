import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * removeMigratedV1toV2Field
 * Remove the migratedV1toV2 field from the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeMigratedV1toV2Field = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD migratedV1toV2 from application table';

  const query = `
    ALTER TABLE Application DROP COLUMN migratedV1toV2
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeMigratedV1toV2Field;
