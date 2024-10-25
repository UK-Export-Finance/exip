import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../../execute-sql-query';

/**
 * removeAntiBriberyTable
 * Remove the "anti-bribery" declaration table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeAntiBriberyTable = (connection: Connection) => {
  const loggingMessage = 'Removing TABLE DeclarationAntiBribery';

  const query = `DROP TABLE DeclarationAntiBribery`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeAntiBriberyTable;
