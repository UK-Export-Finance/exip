import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllExportContractAgentServiceCharges
 * Get all entries in the "ExportContractAgentServiceCharge" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Export contracts agent service charges
 */
const getAllExportContractAgentServiceCharges = async (connection: Connection) => {
  const loggingMessage = 'Getting all export contract agent service charges';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM ExportContractAgentServiceCharge';

    const [charges] = await executeSqlQuery({ connection, query, loggingMessage });

    return charges;
  } catch (error) {
    console.error('🚨 error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllExportContractAgentServiceCharges;
