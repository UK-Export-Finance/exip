import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createLossPayeeFinancialUkVectorTable
 * Create new "loss payee - financial UK vector" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createLossPayeeFinancialUkVectorTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - loss payee financial UK vector';

  const query = `
    CREATE TABLE LossPayeeFinancialUkVector (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      accountNumberVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      sortCodeVector varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createLossPayeeFinancialUkVectorTable;
