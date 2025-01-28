import getPopulatedExportContract from '.';
import getCountryByField from '../get-country-by-field';
import { mockInvalidId } from '../../test-mocks';
import getKeystoneContext from '../../test-helpers/get-keystone-context';
import country from '../../test-helpers/country';
import privateMarket from '../../test-helpers/private-market';
import exportContract from '../../test-helpers/export-contract';
import agent from '../../test-helpers/export-contract-agent';
import service from '../../test-helpers/export-contract-agent-service';
import serviceCharge from '../../test-helpers/export-contract-agent-service-charge';
import {
  ApplicationExportContract,
  ApplicationExportContractAgent,
  ApplicationExportContractAgentService,
  ApplicationExportContractAgentServiceCharge,
  ApplicationPrivateMarket,
  Context,
  Country,
} from '../../types';

describe('helpers/get-populated-export-contract/get-populated-agent', () => {
  let context: Context;

  let createdExportContract: ApplicationExportContract;
  let createdAgent: ApplicationExportContractAgent;
  let createdService: ApplicationExportContractAgentService;
  let createdServiceCharge: ApplicationExportContractAgentServiceCharge;

  let createdPrivateMarket: ApplicationPrivateMarket;
  let createdCountry: Country;

  let serviceConnectObject = {};
  let privateMarketConnectObject = {};
  let agentConnectObject = {};

  beforeAll(async () => {
    context = getKeystoneContext();
  });

  beforeEach(async () => {
    createdCountry = (await country.create(context)) as Country;
    createdPrivateMarket = (await privateMarket.create(context)) as ApplicationPrivateMarket;

    privateMarketConnectObject = {
      connect: {
        id: createdPrivateMarket.id,
      },
    };

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

    agentConnectObject = {
      connect: {
        id: createdAgent.id,
      },
    };

    const initExportContract = {
      agent: agentConnectObject,
      privateMarket: privateMarketConnectObject,
      finalDestinationCountryCode: createdCountry.isoCode,
    };

    createdExportContract = (await exportContract.create(context, initExportContract)) as ApplicationExportContract;
  });

  it('should return a populated exportContract', async () => {
    const result = await getPopulatedExportContract(context, createdExportContract.id);

    expect(result.id).toEqual(createdExportContract.id);
    expect(result.agent.id).toEqual(createdAgent.id);
    expect(result.agent.service.id).toEqual(createdService.id);
    expect(result.agent.service.charge.id).toEqual(createdServiceCharge.id);

    const expectedCountry = await getCountryByField(context, 'isoCode', createdCountry.isoCode);

    expect(result.finalDestinationCountry).toEqual(expectedCountry);

    expect(result.privateMarket.id).toEqual(createdPrivateMarket.id);
  });

  describe('when an exportContract is not found', () => {
    it('should throw an error', async () => {
      const expectedErrorMessage = `Error getting populated exportContract ${mockInvalidId}`;

      await expect(getPopulatedExportContract(context, mockInvalidId)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when an exportContractAgent is not found', () => {
    it('should throw an error', async () => {
      const exportContractObject = {
        privateMarket: privateMarketConnectObject,
        finalDestinationCountryCountryCode: createdCountry.isoCode,
        agent: {
          service: serviceConnectObject,
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const exportContractNoAgent = (await agent.create(context, exportContractObject)) as ApplicationExportContract;

      const expectedErrorMessage = `Error getting populated exportContract ${exportContractNoAgent.id}`;

      await expect(getPopulatedExportContract(context, exportContractNoAgent.id)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a privateMarket is not found', () => {
    it('should throw an error', async () => {
      const exportContractObject = {
        ...createdExportContract,
        privateMarket: privateMarketConnectObject,
        finalDestinationCountryCountryCode: createdCountry.isoCode,
        agent: {
          service: serviceConnectObject,
          connect: {
            id: mockInvalidId,
          },
        },
      };

      const exportContractNoAgent = (await agent.create(context, exportContractObject)) as ApplicationExportContract;

      const expectedErrorMessage = `Error getting populated exportContract ${exportContractNoAgent.id}`;

      await expect(getPopulatedExportContract(context, exportContractNoAgent.id)).rejects.toThrow(expectedErrorMessage);
    });
  });

  describe('when a finalDestinationCountry is not found', () => {
    it('should throw an error', async () => {
      const exportContractObject = {
        privateMarket: privateMarketConnectObject,
        finalDestinationCountryCountryCode: mockInvalidId,
        agent: agentConnectObject,
      };

      const exportContractNoAgent = (await agent.create(context, exportContractObject)) as ApplicationExportContract;

      const expectedErrorMessage = `Error getting populated exportContract ${exportContractNoAgent.id}`;

      await expect(getPopulatedExportContract(context, exportContractNoAgent.id)).rejects.toThrow(expectedErrorMessage);
    });
  });
});
