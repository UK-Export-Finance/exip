import { Connection } from 'mysql2/promise';
import getAllExportContractAgentServices from '../../get-all-export-contract-agent-services';
import getAllExportContractAgentServiceCharges from '../../get-all-export-contract-agent-service-charges';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateExportContractAgentServiceCharges
 * Update "charge" columns in "export contract agent service" entries
 * 1) Map over each "export contract agent service".
 * 2) Generate "service" values (charge ID relationship)
 * 3) Update the values in the ExportContractAgentService table.
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<object>>} executeSqlQuery responses
 */
const updateExportContractAgentServiceCharges = async (connection: Connection) => {
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

export default updateExportContractAgentServiceCharges;
