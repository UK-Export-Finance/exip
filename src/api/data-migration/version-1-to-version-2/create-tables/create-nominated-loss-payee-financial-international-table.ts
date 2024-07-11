import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createLossPayeeFinancialInternationalTable
 * Create new "loss payee - financial international" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createLossPayeeFinancialInternationalTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial international';

  const query = `
    CREATE TABLE LossPayeeFinancialInternational (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      lossPayee varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      bankAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      bicSwiftCode varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      iban varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      vector varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY LossPayeeFinancialInternational_lossPayee_key (lossPayee),
      UNIQUE KEY LossPayeeFinancialInternational_vector_key (vector),
      CONSTRAINT LossPayeeFinancialInternational_lossPayee_fkey FOREIGN KEY (lossPayee) REFERENCES NominatedLossPayee (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE,
        CONSTRAINT LossPayeeFinancialInternational_vector_fkey FOREIGN KEY (vector) REFERENCES LossPayeeFinancialInternationalVector (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createLossPayeeFinancialInternationalTable;
