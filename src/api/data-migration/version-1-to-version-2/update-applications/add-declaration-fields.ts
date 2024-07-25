import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * declarationKeys
 * Add new unique keys to the company table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const declarationKeys = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: 'ALTER TABLE Declaration ADD KEY Declaration_version_idx(version)',
    loggingMessage: 'Adding KEY version to declaration table',
  });

/**
 * declarationConstraints
 * Add new constraints to the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const declarationConstraints = (connection: Connection) =>
  executeSqlQuery({
    connection,
    query: `ALTER TABLE Declaration ADD CONSTRAINT Declaration_version_fkey FOREIGN KEY (version) REFERENCES DeclarationVersion (id) ON DELETE SET NULL ON UPDATE CASCADE`,
    loggingMessage: 'Adding CONSTRAINT version to declaration table',
  });

/**
 * addDeclarationFields
 * Add new fields to the declaration table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationFields = async (connection: Connection) => {
  // TODO: try/catch
  const queries = await Promise.all([
    executeSqlQuery({
      connection,
      query: `ALTER TABLE Declaration ADD version varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL`,
      loggingMessage: 'Adding FIELD version to declaration table',
    }),

    executeSqlQuery({
      connection,
      query: `ALTER TABLE Declaration ADD exportContract tinyint(1) DEFAULT NULL`,
      loggingMessage: 'Adding FIELD exportContract to declaration table',
    }),

    declarationKeys(connection),
    declarationConstraints(connection),
  ]);

  return queries;
};

export default addDeclarationFields;
