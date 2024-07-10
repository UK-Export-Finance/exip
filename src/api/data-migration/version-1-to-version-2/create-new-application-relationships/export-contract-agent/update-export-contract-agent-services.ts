import { Connection } from 'mysql2/promise';
import getAllExportContractAgents from '../../get-all-export-contract-agents';
import getAllExportContractAgentServices from '../../get-all-export-contract-agent-services';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateExportContractAgentServices
 * Update "service" columns in "export contract agent service" entries
 * 1) Map over each "export contract agent service".
 * 2) Generate "agent" values (service ID relationship)
 * 3) Update the values in the ExportContractAgent table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateExportContractAgentServices = async (connection: Connection) => {
  const loggingMessage = 'Updating agent columns in exportContractService entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const agents = await getAllExportContractAgents(connection);
    const agentServices = await getAllExportContractAgentServices(connection);

    const promises = agents.map(async (agent: object, index: number) => {
      const service = agentServices[index];

      const query = `
        UPDATE ExportContractAgent SET service='${service.id}' WHERE id='${agent.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating service column in exportContractAgent table for agent ${agent.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateExportContractAgentServices;
