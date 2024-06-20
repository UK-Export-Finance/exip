import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const addStatusField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD status to account table';

  const query = `
    ALTER TABLE Account ADD status varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const addStatusConstraint = (connection: Connection) => {
  const loggingMessage = 'Adding CONSTRAINT status to account table';

  const query = `
    ALTER TABLE Account ADD CONSTRAINT Account_status_fkey FOREIGN KEY (status) REFERENCES AccountStatus (id) ON DELETE SET NULL ON UPDATE CASCADE
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const removeIsVerifiedField = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD isVerified from account table';

  const query = `
    ALTER TABLE Account DROP COLUMN isVerified
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const removeIsBlockedField = (connection: Connection) => {
  const loggingMessage = 'Removing FIELD isBlocked from account table';

  const query = `
    ALTER TABLE Account DROP COLUMN isBlocked
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const updateAccounts = {
  statusField: (connection: Connection) => addStatusField(connection),
  statusConstraint: (connection: Connection) => addStatusConstraint(connection),
  isVerifiedField: (connection: Connection) => removeIsVerifiedField(connection),
  isBlockedField: (connection: Connection) => removeIsBlockedField(connection),
};

export default updateAccounts;
