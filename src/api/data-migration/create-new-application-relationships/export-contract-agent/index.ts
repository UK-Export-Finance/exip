import { Context } from '.keystone/types'; // eslint-disable-line
import createInitialAgents from './create-initial-agents';
import createAgentServices from './create-agent-services';
import createAgentServiceCharges from './create-agent-service-charges';
import { Application } from '../../../types';

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
 * @returns {Promise<Array<ApplicationExportContractAgent>>} Export contract agent entries
 */
const createExportContractAgent = async (context: Context, applications: Array<Application>) => {
  const loggingMessage = 'Creating exportContractAgent with service and charge relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContractIdsConnectArray = applications.map((application) => ({
      exportContract: {
        connect: {
          id: application.exportContractId,
        },
      },
    }));

    const agents = await createInitialAgents(context, exportContractIdsConnectArray);

    const agentIdsConnectArray = agents.map((agent) => ({
      agent: {
        connect: {
          id: agent.id,
        },
      },
    }));

    const services = await createAgentServices(context, agentIdsConnectArray);

    const agentServiceIdsConnectArray = services.map((service) => ({
      service: {
        connect: {
          id: service.id,
        },
      },
    }));

    await createAgentServiceCharges(context, agentServiceIdsConnectArray);

    return agents;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

export default createExportContractAgent;
