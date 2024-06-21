import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createPrivateMarketTable
 * Create new "private market" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createPrivateMarketTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - private market';

  const query = `
    CREATE TABLE PrivateMarket (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      attempted tinyint(1) DEFAULT NULL,
      declinedDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createPrivateMarketTable;
