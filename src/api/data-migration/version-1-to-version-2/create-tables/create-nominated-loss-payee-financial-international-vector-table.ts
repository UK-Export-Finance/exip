import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createLossPayeeFinancialInternationalVectorTable
 * Create new "loss payee - financial international vector" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createLossPayeeFinancialInternationalVectorTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial international vector';

  const query = `
    CREATE TABLE LossPayeeFinancialInternationalVector (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      bicSwiftCodeVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      ibanVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createLossPayeeFinancialInternationalVectorTable;
