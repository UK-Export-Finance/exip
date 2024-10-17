import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * removeHowDataWillBeUsedTable
 * Remove the "how data will be used" declaration table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeHowDataWillBeUsedTable = (connection: Connection) => {
  const loggingMessage = 'Removing TABLE DeclarationHowDataWillBeUsed';

  const query = `DROP TABLE DeclarationHowDataWillBeUsed`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeHowDataWillBeUsedTable;
