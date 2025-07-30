import { Connection } from 'mysql2/promise';
import executeSqlQuery from '../execute-sql-query';

/**
 * getAllExportContractAgentServices
 * Get all entries in the "ExportContractAgentService" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<object>} Export contracts agent services
 */
const getAllExportContractAgentServices = async (connection: Connection) => {
  const loggingMessage = 'Getting all export contract agent services';

  console.info('✅ %s', loggingMessage);

  try {
    const query = 'SELECT * FROM ExportContractAgentService';

    const [services] = await executeSqlQuery({ connection, query, loggingMessage });

    return services;
  } catch (error) {
    console.error('🚨 Error %s %o', loggingMessage, error);

    throw new Error(`🚨 error ${loggingMessage} ${error}`);
  }
};

export default getAllExportContractAgentServices;
