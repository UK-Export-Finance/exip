import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * companyUniqueKeys
 * Add new unique keys to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const companyUniqueKeys = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: 'ALTER TABLE Company ADD UNIQUE KEY Company_agent_key (differentTradingAddress)',
    loggingMessage: 'Adding UNIQUE KEY differentTradingAddress to company table',
  });

/**
 * companyConstraints
 * Add new constraints to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const companyConstraints = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: `ALTER TABLE Company ADD CONSTRAINT Different_trading_address_fkey FOREIGN KEY (differentTradingAddress) REFERENCES CompanyDifferentTradingAddress (id) ON DELETE SET NULL ON UPDATE CASCADE`,
    loggingMessage: 'Adding CONSTRAINT differentTradingAddress to company table',
  });

/**
 * addCompanyFields
 * Add new fields to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addCompanyFields = async (connection: Connection) => {
  const queries = await Promise.all([
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

    companyUniqueKeys(connection),
    companyConstraints(connection),
  ]);

  return queries;
};

export default addCompanyFields;
