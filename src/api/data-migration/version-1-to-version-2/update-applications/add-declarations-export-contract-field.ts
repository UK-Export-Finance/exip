import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * addDeclarationsExportContractField
 * Add a exportContract field to the declarations table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const addDeclarationsExportContractField = (connection: Connection) => {
  const loggingMessage = 'Adding FIELD exportContract to declaration table';

  const query = `
    ALTER TABLE Declaration ADD exportContract tinyint(1) DEFAULT NULL
  `;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default addDeclarationsExportContractField;
