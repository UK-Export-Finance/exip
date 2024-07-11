import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createBuyerTradingHistoryTable
 * Create new "buyer trading history" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createBuyerTradingHistoryTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer trading history';

  const query = `
    CREATE TABLE BuyerTradingHistory (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      currencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GBP',
      outstandingPayments tinyint(1) DEFAULT NULL,
      failedPayments tinyint(1) DEFAULT NULL,
      exporterHasTradedWithBuyer tinyint(1) DEFAULT NULL,
      totalOverduePayments int DEFAULT NULL,
      totalOutstandingPayments int DEFAULT NULL,
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerTradingHistory_application_idx (application),
      CONSTRAINT BuyerTradingHistory_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createBuyerTradingHistoryTable;
