import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createBuyerRelationshipTable
 * Create new "buyer relationship" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createBuyerRelationshipTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - buyer relationship';

  const query = `
    CREATE TABLE BuyerRelationship (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      exporterIsConnectedWithBuyer tinyint(1) DEFAULT NULL,
      connectionWithBuyerDescription varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      exporterHasPreviousCreditInsuranceWithBuyer tinyint(1) DEFAULT NULL,
      exporterHasBuyerFinancialAccounts tinyint(1) DEFAULT NULL,
      previousCreditInsuranceWithBuyerDescription varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      application varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY BuyerRelationship_application_idx (application),
      CONSTRAINT BuyerRelationship_application_fkey FOREIGN KEY (application) REFERENCES Application (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createBuyerRelationshipTable;
