import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createNominatedLossPayeeTable
 * Create new "loss payee" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createNominatedLossPayeeTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - nominated loss payee';

  const query = `
    CREATE TABLE NominatedLossPayee (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      isAppointed tinyint(1) DEFAULT NULL,
      name varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      isLocatedInUk tinyint(1) DEFAULT NULL,
      isLocatedInternationally tinyint(1) DEFAULT NULL,
      PRIMARY KEY (id),
      KEY NominatedLossPayee_application_idx (application),
      CONSTRAINT NominatedLossPayee_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createNominatedLossPayeeTable;
