import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createBuyerContactTable
 * Create new "buyer contact" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createBuyerContactTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer contact';

  const query = `
    CREATE TABLE BuyerContact (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      contactFirstName varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactLastName varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactPosition varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      contactEmail varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      canContactBuyer tinyint(1) DEFAULT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerContact_application_idx (application),
      CONSTRAINT BuyerContact_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createBuyerContactTable;
