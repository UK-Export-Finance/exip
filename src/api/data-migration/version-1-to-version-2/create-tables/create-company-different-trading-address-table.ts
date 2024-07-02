import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * createCompanyDifferentTradingAddressTable
 * Create new "company different trading address" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createCompanyDifferentTradingAddressTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - company different trading address';

  const query = `
    CREATE TABLE CompanyDifferentTradingAddress (
      id varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
      company varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      fullAddress varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id),
      KEY CompanyDifferentTradingAddress_company_idx (company),
      CONSTRAINT CompanyDifferentTradingAddress_company_fkey FOREIGN KEY (company) REFERENCES Company (id) ON DELETE SET NULL ON UPDATE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createCompanyDifferentTradingAddressTable;
