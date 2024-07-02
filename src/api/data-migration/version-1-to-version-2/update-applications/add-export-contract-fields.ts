import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * exportContractUniqueKeys
 * Add new unique keys to the export contract table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const exportContractUniqueKeys = async (connection: Connection) => {
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE ExportContract ADD UNIQUE KEY ExportContract_agent_key (agent)',
      loggingMessage: 'Adding UNIQUE KEY agent to exportContract table',
    }),
    executeSqlQuery({
      connection,
      query: 'ALTER TABLE ExportContract ADD UNIQUE KEY ExportContract_privateMarket_key (privateMarket)',
      loggingMessage: 'Adding UNIQUE KEY privateMarket to exportContract table',
    }),
  ]);

  return queries;
};

/**
 * exportContractConstraints
 * Add new constraints to the export contract table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const exportContractConstraints = async (connection: Connection) => {
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query:
        'ALTER TABLE ExportContract ADD CONSTRAINT ExportContract_agent_fkey FOREIGN KEY (agent) REFERENCES ExportContractAgent (id) ON DELETE SET NULL ON UPDATE CASCADE',
      loggingMessage: 'Adding CONSTRAINT agent to exportContract table',
    }),

    executeSqlQuery({
      connection,
      query: `ALTER TABLE ExportContract ADD CONSTRAINT ExportContract_privateMarket_fkey FOREIGN KEY (privateMarket) REFERENCES PrivateMarket (id) ON DELETE SET NULL ON UPDATE CASCADE`,
      loggingMessage: 'Adding CONSTRAINT privateMarket to exportContract table',
    }),
  ]);

  return queries;
};

/**
 * addExportContractFields
 * Add new export contract fields to the exportContract table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addExportContractFields = async (connection: Connection) => {
  const queries = await Promise.all([
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

    exportContractUniqueKeys(connection),

    exportContractConstraints(connection),
  ]);

  return queries;
};

export default addExportContractFields;
