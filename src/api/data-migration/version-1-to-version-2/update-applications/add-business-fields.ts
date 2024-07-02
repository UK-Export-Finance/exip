import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addBusinessFields
 * Add new business fields to the business table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addBusinessFields = async (connection: Connection) => {
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Business ADD turnoverCurrencyCode varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT ''`,
      loggingMessage: 'Adding FIELD turnoverCurrencyCode to business table',
    }),

    executeSqlQuery({
      connection,
      query: `ALTER TABLE Business ADD hasCreditControlProcess tinyint(1) DEFAULT NULL`,
      loggingMessage: 'Adding FIELD hasCreditControlProcess to business table',
    }),
  ]);

  return queries;
};

export default addBusinessFields;
