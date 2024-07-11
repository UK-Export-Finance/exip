import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createLossPayeeFinancialUkTable
 * Create new "loss payee - financial UK" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createLossPayeeFinancialUkTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial UK';

  const query = `
    CREATE TABLE LossPayeeFinancialUk (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      lossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      accountNumber varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      bankAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      sortCode varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      vector varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY LossPayeeFinancialUk_lossPayee_key (lossPayee),
      UNIQUE KEY LossPayeeFinancialUk_vector_key (vector),
      CONSTRAINT LossPayeeFinancialUk_lossPayee_fkey FOREIGN KEY (lossPayee) REFERENCES NominatedLossPayee (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE,
        CONSTRAINT LossPayeeFinancialUk_vector_fkey FOREIGN KEY (vector) REFERENCES LossPayeeFinancialUkVector (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createLossPayeeFinancialUkTable;
