import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createJointlyInsuredPartyTable
 * Create new "jointly insured party" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createJointlyInsuredPartyTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - jointly insured party';

  const query = `
    CREATE TABLE JointlyInsuredParty (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      policy varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      requested tinyint(1) DEFAULT NULL,
      companyName varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      companyNumber varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      countryCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      UNIQUE KEY JointlyInsuredParty_policy_key (policy),
      CONSTRAINT JointlyInsuredParty_policy_fkey FOREIGN KEY (policy) REFERENCES Policy (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createJointlyInsuredPartyTable;
