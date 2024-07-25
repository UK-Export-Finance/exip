import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * removeConfidentialityTable
 * Remove the "confidentiality" declaration table
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const removeConfidentialityTable = (connection: Connection) => {
  const loggingMessage = 'Removing TABLE DeclarationConfidentiality';

  const query = `DROP TABLE DeclarationConfidentiality`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default removeConfidentialityTable;
