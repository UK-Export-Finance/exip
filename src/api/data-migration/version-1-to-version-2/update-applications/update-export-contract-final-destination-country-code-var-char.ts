import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * updateExportContractFinalDestinationCountryCodeVarChar
 * Update the export contract table's "final destination country code" field VarChar
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery response
 */
const updateExportContractFinalDestinationCountryCodeVarChar = async (connection: Connection) => {
  const loggingMessage = 'Updating FIELD finalDestinationCountryCode VARCHAR in the buyer table';

  const query = `ALTER TABLE ExportContract MODIFY COLUMN finalDestinationCountryCode VARCHAR(3)`;

  return executeSqlQuery({ connection, query, loggingMessage });
};

export default updateExportContractFinalDestinationCountryCodeVarChar;
