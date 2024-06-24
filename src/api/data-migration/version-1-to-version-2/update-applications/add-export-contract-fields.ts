import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addCompanyFields
 * Add new export contract fields to the exportContract table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addExportContractFields = (connection: Connection) => {
  const queries = Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD paymentTermsDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD paymentTermsDescription to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD privateMarket varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD privateMarket to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD agent varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD agent to exportContract table',
    }),
  ]);

  return queries;
};

export default addExportContractFields;
