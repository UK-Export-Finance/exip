import createAnExportContractAgentServiceCharge from '.';
import { APPLICATION } from '../../constants';
import createAnExportContract from '../create-an-export-contract';
import { Application, ApplicationExportContractAgentService, Context } from '../../types';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import applications from '../../test-helpers/applications';

const assertError = (error) => {
  const errorString = String(error);

  expect(errorString.includes('Creating an export contract agent service charge')).toEqual(true);
};

describe('helpers/create-an-export-contract-agent-service-charge', () => {
  let context: Context;
  let application: Application;
  let applicationExportContractAgentService: ApplicationExportContractAgentService;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = (await applications.create({ context })) as Application;
    const { agentService } = await createAnExportContract(context, application.id);

    applicationExportContractAgentService = agentService;
  });

  it('should return an agentServiceCharge ID', async () => {
    const agentServiceCharge = await createAnExportContractAgentServiceCharge(context, applicationExportContractAgentService.id);

    expect(agentServiceCharge.id).toBeDefined();
    expect(typeof agentServiceCharge.id).toEqual('string');
    expect(agentServiceCharge.id.length).toBeGreaterThan(0);
  });

  it('should return empty agentServiceCharge fields with default currency code', async () => {
    const agentServiceCharge = await createAnExportContractAgentServiceCharge(context, applicationExportContractAgentService.id);

    expect(agentServiceCharge.percentageCharge).toBeNull();
    expect(agentServiceCharge.fixedSumAmount).toBeNull();
    expect(agentServiceCharge.fixedSumCurrencyCode).toEqual(APPLICATION.DEFAULT_CURRENCY);
    expect(agentServiceCharge.payableCountryCode).toEqual('');
    expect(agentServiceCharge.method).toBeNull();
  });

  describe('when an invalid agentServiceId ID is passed', () => {
    it('should throw an error', async () => {
      try {
        await createAnExportContractAgentServiceCharge(context, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });

  describe('when creation is not successful', () => {
    it('should throw an error', async () => {
      try {
        // pass empty context object to force an error
        await createAnExportContractAgentServiceCharge({}, mockInvalidId);
      } catch (error) {
        assertError(error);
      }
    });
  });
});
