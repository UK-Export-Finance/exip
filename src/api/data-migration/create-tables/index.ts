import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

const createAccountStatus = (connection: Connection) => {
  const loggingMessage = 'Creating account status table';

  const query =  `
    CREATE TABLE AccountStatus5 (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      isBlocked tinyint(1) NOT NULL DEFAULT '0',
      isVerified tinyint(1) NOT NULL DEFAULT '0',
      isInactive tinyint(1) NOT NULL DEFAULT '0',
      updatedAt datetime(3) DEFAULT NULL,
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

const createTables = {
  accountStatus: (connection: Connection) => createAccountStatus(connection),
};

export default createTables;
