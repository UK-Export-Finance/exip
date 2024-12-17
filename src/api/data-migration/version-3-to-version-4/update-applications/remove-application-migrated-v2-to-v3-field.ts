import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * removeMigratedV2toV3Field
 * Remove the migratedV2toV3 field from the application table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeMigratedV2toV3Field = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD migratedV2toV3 from application table';

  const query = `
    ALTER TABLE Application DROP COLUMN migratedV2toV3
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeMigratedV2toV3Field;
