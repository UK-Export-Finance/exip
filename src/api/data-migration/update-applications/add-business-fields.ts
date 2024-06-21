import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addBusinessFields = (connection: Connection) => {
  const queries = Promise.all([
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
