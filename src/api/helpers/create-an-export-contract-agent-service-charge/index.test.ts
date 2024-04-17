import createAnExportContractAgentServiceCharge from '.';
import createAnExportContract from '../create-an-export-contract';
import { Application, ApplicationExportContractAgentService, Context } from '../../types';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const invalidId = 'invalid-id';

const assertError = (err) => {
  const errorString = String(err);

  expect(errorString.includes('Creating an export contract agent service charge')).toEqual(true);
};

describe('helpers/create-an-export-contract-agent-service-charge', () => {
  let context: Context;
  let application: Application;
  let applicationExportContractAgentService: ApplicationExportContractAgentService;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context, data: {} })) as Application;
    const { agentService } = await createAnExportContract(context, application.id);

    applicationExportContractAgentService = agentService;
  });

  test('it should return an agentServiceCharge ID', async () => {
    const agentServiceCharge = await createAnExportContractAgentServiceCharge(context, applicationExportContractAgentService.id);

    expect(agentServiceCharge.id).toBeDefined();
    expect(typeof agentServiceCharge.id).toEqual('string');
    expect(agentServiceCharge.id.length).toBeGreaterThan(0);
  });

  test('it should return empty agentServiceCharge fields', async () => {
    const agentServiceCharge = await createAnExportContractAgentServiceCharge(context, applicationExportContractAgentService.id);

    expect(agentServiceCharge.chargePercentage).toEqual('');
    expect(agentServiceCharge.fixedSumAmount).toEqual('');
    expect(agentServiceCharge.payableCountryCode).toEqual('');
    expect(agentServiceCharge.method).toBeNull();
  });

  describe('when an invalid agentServiceId ID is passed', () => {
    test('it should throw an error', async () => {
      try {
        await createAnExportContractAgentServiceCharge(context, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });

  describe('when creation is not successful', () => {
    test('it should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnExportContractAgentServiceCharge({}, invalidId);
      } catch (err) {
        assertError(err);
      }
    });
  });
});
