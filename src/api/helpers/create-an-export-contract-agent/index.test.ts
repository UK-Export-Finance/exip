import createAnExportContractAgent from '.';
import createAnExportContract from '../create-an-export-contract';
import { Application, ApplicationExportContract, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating an export contract agent')).toEqual(true);
};

describe('helpers/create-an-export-contract-agent', () => {
  let context: Context;
  let application: Application;
  let applicationExportContract: ApplicationExportContract;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
    applicationExportContract = await createAnExportContract(context, application.id);
  });

  it('should return an agent ID', async () => {
    const { agent } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agent.id).toBeDefined();
    expect(typeof agent.id).toEqual('string');
    expect(agent.id.length).toBeGreaterThan(0);
  });

  it('should return empty agent fields', async () => {
    const { agent } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agent.countryCode).toEqual('');
    expect(agent.fullAddress).toEqual('');
    expect(agent.isUsingAgent).toBeNull();
    expect(agent.name).toEqual('');
  });

  it('should return an agentService ID', async () => {
    const { agentService } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agentService.id).toBeDefined();
    expect(typeof agentService.id).toEqual('string');
    expect(agentService.id.length).toBeGreaterThan(0);
  });

  it('should return empty agentService fields', async () => {
    const { agentService } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agentService.agentIsCharging).toBeNull();
    expect(agentService.serviceDescription).toEqual('');
  });

  it('should return an agentServiceCharge ID', async () => {
    const { agentServiceCharge } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agentServiceCharge.id).toBeDefined();
    expect(typeof agentServiceCharge.id).toEqual('string');
    expect(agentServiceCharge.id.length).toBeGreaterThan(0);
  });

  it('should return empty agentService fields', async () => {
    const { agentServiceCharge } = await createAnExportContractAgent(context, applicationExportContract.id);

    expect(agentServiceCharge.percentageCharge).toBeNull();
    expect(agentServiceCharge.fixedSumAmount).toBeNull();
    expect(agentServiceCharge.payableCountryCode).toEqual('');
    expect(agentServiceCharge.method).toBeNull();
  });

  describe('when an invalid exportContract ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createAnExportContractAgent(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnExportContractAgent({}, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
