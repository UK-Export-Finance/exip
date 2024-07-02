import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllExportContractAgentServices
 * Get all entries in the "ExportContractAgentService" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Export contracts agent services
 */
const getAllExportContractAgentServices = async (connection: Connection) => {
  const loggingMessage = 'Getting all export contract agent services';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM ExportContractAgentService';

    const [services] = await executeSqlQuery({ connection, query, loggingMessage });

    return services;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllExportContractAgentServices;
