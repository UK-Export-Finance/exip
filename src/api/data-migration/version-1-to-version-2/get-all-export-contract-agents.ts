import { Connection } from 'mysql2/promise';
import executeSqlQuery from './execute-sql-query';

/**
 * getAllExportContractAgents
 * Get all entries in the "ExportContractAgent" table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Object>} Export contracts agents
 */
const getAllExportContractAgents = async (connection: Connection) => {
  const loggingMessage = 'Getting all export contract agents';

  console.info(`✅ ${loggingMessage}`);

  try {
    const query = 'SELECT * FROM ExportContractAgent';

    const [agents] = await executeSqlQuery({ connection, query, loggingMessage });

    return agents;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default getAllExportContractAgents;
