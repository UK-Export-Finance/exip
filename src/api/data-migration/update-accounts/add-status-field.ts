import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addStatusField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD status to account table';

  const query = `
    ALTER TABLE Account ADD status varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addStatusField;
