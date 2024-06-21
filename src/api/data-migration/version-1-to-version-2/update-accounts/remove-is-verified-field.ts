import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const removeIsVerifiedField = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD isVerified from account table';

  const query = `
    ALTER TABLE Account DROP COLUMN isVerified
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeIsVerifiedField;
