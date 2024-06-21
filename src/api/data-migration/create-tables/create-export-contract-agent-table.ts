import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createExportContractAgentTable
 * Create new "export contract - agent" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createExportContractAgentTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent';

  const query = `
    CREATE TABLE ExportContractAgent (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      service varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      countryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      isUsingAgent tinyint(1) DEFAULT NULL,
      name varchar(800) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      UNIQUE KEY ExportContractAgent_service_key (service),
      CONSTRAINT ExportContractAgent_service_fkey FOREIGN KEY (service) REFERENCES ExportContractAgentService (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createExportContractAgentTable;
