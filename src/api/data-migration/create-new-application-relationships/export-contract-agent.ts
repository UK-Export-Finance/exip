import { Context } from '.keystone/types'; // eslint-disable-line
import mapArrayOfConnectionObjects from '../map-array-of-connection-objects';

const createInitialAgents = async (context: Context, exportContractIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating initial exportContractAgents with export contract relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgent.createMany({
      data: exportContractIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const createAgentServices = async (context: Context, agentIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating exportContractAgentServices with agent relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgentService.createMany({
      data: agentIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const createAgentServiceCharges = async (context: Context, agentServiceIdsConnectArray: Array<object>) => {
  const loggingMessage = 'Creating exportContractAgentServiceCharges with agent service relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const created = await context.db.ExportContractAgentServiceCharge.createMany({
      data: agentServiceIdsConnectArray,
    });

    return created;
  } catch (err) {
    console.error(`🚨 error ${loggingMessage} %O`, err);

    throw new Error(`🚨 error ${loggingMessage} ${err}`);
  }
};

const createExportContractAgent = async (context: Context, applications: Array<object>) => {
  const loggingMessage = 'Creating exportContractAgent with service and charge relationships';

  console.info(`✅ ${loggingMessage}`);

  try {
    const exportContractIdsConnectArray = applications.map((application) => ({
      exportContract: {
        connect: {
          // @ts-ignore
          id: application.exportContractId,
        },
      },
    }));
  
    const agents = await createInitialAgents(context, exportContractIdsConnectArray);

    const agentIdsConnectArray = agents.map((agent) => ({
      agent: {
        connect: {
          // @ts-ignore
          id: agent.id,
        },
      },
    }));

    const services = await createAgentServices(context, agentIdsConnectArray);

    const agentServiceIdsConnectArray = services.map((service) => ({
      service: {
        connect: {
          // @ts-ignore
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
