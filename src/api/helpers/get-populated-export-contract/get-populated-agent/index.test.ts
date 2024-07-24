import getPopulatedAgent from '.';
import { mockInvalidId } from '../../../test-mocks';
import getKeystoneContext from '../../../test-helpers/get-keystone-context';
import agent from '../../../test-helpers/export-contract-agent';
import service from '../../../test-helpers/export-contract-agent-service';
import serviceCharge from '../../../test-helpers/export-contract-agent-service-charge';
import { ApplicationExportContractAgent, ApplicationExportContractAgentService, ApplicationExportContractAgentServiceCharge, Context } from '../../../types';

describe('helpers/get-populated-export-contract/get-populated-agent', () => {
  let context: Context;

  let createdAgent: ApplicationExportContractAgent;
  let createdService: ApplicationExportContractAgentService;
  let createdServiceCharge: ApplicationExportContractAgentServiceCharge;

  let serviceConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdService = (await service.create(context)) as ApplicationExportContractAgentService;

    serviceConnectObject = {
      connect: {
        id: createdService.id,
      },
    };

    const initServiceCharge = {
      service: serviceConnectObject,
    };

    createdServiceCharge = (await serviceCharge.create(context, initServiceCharge)) as ApplicationExportContractAgentServiceCharge;

    const initAgent = {
      service: serviceConnectObject,
    };

    createdAgent = (await agent.create(context, initAgent)) as ApplicationExportContractAgent;
  });

  it('should return a populated agent', async () => {
    const result = await getPopulatedAgent(context, createdAgent.id);

    expect(result.id).toEqual(createdAgent.id);
    expect(result.service.id).toEqual(createdService.id);
    expect(result.service.charge.id).toEqual(createdServiceCharge.id);
  });

  describe('when an agent is not found', () => {
    it('should throw an error', async () => {
      try {
        await getPopulatedAgent(context, mockInvalidId);
      } catch (err) {
        const expected = `Getting populated exportContract agent ${mockInvalidId}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when an agentService is not found', () => {
    it('should throw an error', async () => {
      const agentObject = {
        service: {
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const agentNoService = (await agent.create(context, agentObject)) as ApplicationExportContractAgentService;

      try {
        await getPopulatedAgent(context, agentNoService.id);
      } catch (err) {
        const expected = `Getting populated exportContract agent ${agentNoService.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });

  describe('when an agentServiceCharge is not found', () => {
    it('should throw an error', async () => {
      const agentObject = {
        service: {
          ...serviceConnectObject,
          charge: {
            connect: {
              id: mockInvalidId,
            },
          },
        },
      };

      const agentNoServiceCharge = (await agent.create(context, agentObject)) as ApplicationExportContractAgentServiceCharge;

      try {
        await getPopulatedAgent(context, agentNoServiceCharge.id);
      } catch (err) {
        const expected = `Getting populated exportContract agent ${agentNoServiceCharge.id}`;

        expect(String(err).includes(expected)).toEqual(true);
      }
    });
  });
});
