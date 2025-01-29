import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * createDeclarationModernSlaveryVersionTable
 * Create new "declaration modern slavery version" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createDeclarationModernSlaveryVersionTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - declaration modern slavery version';

  const query = `
    CREATE TABLE DeclarationModernSlaveryVersion (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      declarationModernSlavery varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      willAdhereToAllRequirements varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      hasNoOffensesOrInvestigations varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      isNotAwareOfExistingSlavery varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createDeclarationModernSlaveryVersionTable;
