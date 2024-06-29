import { Connection } from 'mysql2/promise';
import getAllExportContractAgentServices from '../../get-all-export-contract-agent-services';
import getAllExportContractAgentServiceCharges from '../../get-all-export-contract-agent-service-charges';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateExportContractAgentServices
 * Update "service" columns in "export contract" entries
 * TODO: update documentation
 * TODO: update documentation
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const updateExportContractAgentServices = async (connection: Connection) => {
  const loggingMessage = 'Updating agent columns in exportContract entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContractAgentServices = await getAllExportContractAgentServices(connection);
    const exportContractAgentServiceCharges = await getAllExportContractAgentServiceCharges(connection);

    const promises = exportContractAgentServices.map(async (agentService: object, index: number) => {
      const charge = exportContractAgentServiceCharges[index];

      const query = `
        UPDATE ExportContractAgentService SET charge='${charge.id}' WHERE id='${agentService.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating charge column in exportContractAgentService table for exportContractAgentService ${agentService.id}`,
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
