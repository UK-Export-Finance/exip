import createAnExportContractAgentService from '.';
import createAnExportContract from '../create-an-export-contract';
import { Application, ApplicationExportContractAgent, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an export contract agent service')).toEqual(true);
};

describe('helpers/create-an-export-contract-agent', () => {
  let context: Context;
  let application: Application;
  let applicationExportContractAgent: ApplicationExportContractAgent;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    const { agent } = await createAnExportContract(context, application.id);

    applicationExportContractAgent = agent;
  });

  test('it should return an agentService ID', async () => {
    const agentService = await createAnExportContractAgentService(context, applicationExportContractAgent.id);

    expect(agentService.id).toBeDefined();
    expect(typeof agentService.id).toEqual('string');
    expect(agentService.id.length).toBeGreaterThan(0);
  });

  test('it should return empty agentService fields', async () => {
    const agentService = await createAnExportContractAgentService(context, applicationExportContractAgent.id);

    expect(agentService.agentIsCharging).toBeNull();
    expect(agentService.serviceDescription).toEqual('');
  });

  describe('when an invalid agentId ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAnExportContractAgentService(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnExportContractAgentService({}, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
