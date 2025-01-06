import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * createDeclarationModernSlaveryTable
 * Create new "declaration modern slavery" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createDeclarationModernSlaveryTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - declaration modern slavery';

  const query = `
    CREATE TABLE DeclarationModernSlavery (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      version varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      willAdhereToAllRequirements tinyint(1) DEFAULT NULL,
      hasNoOffensesOrInvestigations tinyint(1) DEFAULT NULL,
      isNotAwareOfExistingSlavery tinyint(1) DEFAULT NULL,
      awareOfExistingSlavery varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      cannotAdhereToAllRequirements varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      offensesOrInvestigations varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      PRIMARY KEY (id)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createDeclarationModernSlaveryTable;
