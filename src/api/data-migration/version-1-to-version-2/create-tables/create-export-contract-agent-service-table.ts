import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createExportContractAgentServiceTable
 * Create new "export contract - agent service" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createExportContractAgentServiceTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - export contract agent service';

  const query = `
    CREATE TABLE ExportContractAgentService (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      agentIsCharging tinyint(1) DEFAULT NULL,
      serviceDescription varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      charge varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      UNIQUE KEY ExportContractAgentService_charge_key (charge),
      CONSTRAINT ExportContractAgentService_charge_fkey FOREIGN KEY (charge) REFERENCES ExportContractAgentServiceCharge (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createExportContractAgentServiceTable;
