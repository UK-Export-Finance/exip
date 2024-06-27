import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createExportContractAgentServiceChargeTable
 * Create new "export contract - agent service charge" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createExportContractAgentServiceChargeTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent service charge';

  const query = `
    CREATE TABLE ExportContractAgentServiceCharge (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      percentageCharge int DEFAULT NULL,
      fixedSumAmount int DEFAULT NULL,
      fixedSumCurrencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'GBP',
      method varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      payableCountryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createExportContractAgentServiceChargeTable;
