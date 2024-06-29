import { Connection } from 'mysql2/promise';
import createInitialAgents from './create-initial-agents';
import updateExportContractAgents from './update-export-contract-agents';
import createAgentServices from './create-agent-services';
import updateExportContractAgentServices from './update-export-contract-agent-services';
import createAgentServiceCharges from './create-agent-service-charges';
import updateExportContractServiceCharges from './update-export-contract-agent-service-charges';
import { Application } from '../../../../types';

/**
 * createExportContractAgent
 * Create a new "export contract agent" with "service" and "service charge" relationships.
 * 1) Create an array of export contract ID "connect" relationships.
 * 2) Create initial agent entries.
 * 3) Create an array of agent ID "connect" relationships.
 * 4) Create agent service entries.
 * 5) Create an array of service ID "connect" relationships.
 * 6) Create agent service charge entries.
 * @param {Connection} connection: SQL database connection
 * @param {Array<Application>} applications: Applications
 * @returns {Promise<Array>}
 */
const createExportContractAgent = async (connection: Connection, applications: Array<Application>) => {
  const loggingMessage = 'Creating exportContractAgent with service and charge relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const promises = await Promise.all([
      createInitialAgents(connection, applications),
      updateExportContractAgents(connection),
      createAgentServices(connection, applications),
      updateExportContractAgentServices(connection),
      createAgentServiceCharges(connection, applications),
      updateExportContractServiceCharges(connection),
    ]);

    return promises;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createExportContractAgent;
