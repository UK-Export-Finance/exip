import { Connection } from 'mysql2/promise';
import getAllExportContracts from '../../get-all-export-contracts';
import getAllExportContractAgents from '../../get-all-export-contract-agents';
import executeSqlQuery from '../../execute-sql-query';

/**
 * updateExportContractAgents
 * Update "agent" columns in "export contract" entries
 * TODO: update documentation
 * TODO: update documentation
 * @param {Connection} connection: SQL database connection
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const updateExportContractAgents = async (connection: Connection) => {
  const loggingMessage = 'Updating agent columns in exportContract entries';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContracts = await getAllExportContracts(connection);
    const exportContractAgents = await getAllExportContractAgents(connection);

    const promises = exportContracts.map(async (exportContract: object, index: number) => {
      const agent = exportContractAgents[index];

      const query = `
        UPDATE ExportContract SET agent='${agent.id}' WHERE id='${exportContract.id}'
      `;

      const updated = await executeSqlQuery({
        connection,
        query,
        loggingMessage: `Updating agent column in exportContract table for exportContract ${exportContract.id}`,
      });

      return updated;
    });

    return Promise.all(promises);
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default updateExportContractAgents;
