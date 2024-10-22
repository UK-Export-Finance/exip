import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * createDeclarationVersionTable
 * Create new "declaration version" database table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const createDeclarationVersionTable = (connection: Connection) => {
  const loggingMessage = 'Creating TABLE - declaration version';

  const query = `
    CREATE TABLE DeclarationVersion (
      id varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
      agreeHowDataWillBeUsed varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      agreeToAntiBribery varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      agreeToConfidentiality varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      agreeToConfirmationAndAcknowledgements varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      hasAntiBriberyCodeOfConduct varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      willExportWithAntiBriberyCodeOfConduct varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
      declaration varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
      PRIMARY KEY (id),
      KEY DeclarationVersion_declaration_idx (declaration),
      CONSTRAINT DeclarationVersion_declaration_fkey FOREIGN KEY (declaration) REFERENCES Declaration (id) ON DELETE
      SET
        NULL ON UPDATE CASCADE
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default createDeclarationVersionTable;
