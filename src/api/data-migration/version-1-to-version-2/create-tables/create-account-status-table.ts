import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createAccountStatusTable
 * Create new "account status" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createAccountStatusTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - account status';

  const query = `
    CREATE TABLE AccountStatus (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      isBlocked tinyint(1) NOT NULL DEFAULT '0',
      isVerified tinyint(1) NOT NULL DEFAULT '0',
      isInactive tinyint(1) NOT NULL DEFAULT '0',
      updatedAt datetime(3) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createAccountStatusTable;
