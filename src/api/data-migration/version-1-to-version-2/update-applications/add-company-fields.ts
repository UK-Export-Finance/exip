import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addCompanyFields
 * Add new company fields to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addCompanyFields = (connection: Connection) => {
  const queries = Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Company ADD differentTradingName varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD differentTradingName to company table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Company ADD differentTradingAddress varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD differentTradingAddress to company table',
    }),
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Company ADD CONSTRAINT Different_trading_address_fkey FOREIGN KEY (differentTradingAddress) REFERENCES CompanyDifferentTradingAddress (id) ON DELETE SET NULL ON UPDATE CASCADE`,
      loggingMessage: 'Adding CONSTRAINT differentTradingAddress to company table',
    }),
  ]);

  return queries;
};

export default addCompanyFields;
