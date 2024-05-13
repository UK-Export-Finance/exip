import mapAndSave from '.';
import saveAgent from '../../save-data/export-contract-agent';
import saveAgentService from '../../save-data/export-contract-agent-service';
import saveAgentServiceCharge from '../../save-data/export-contract-agent-service-charge';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import mapSubmittedData from '../../map-submitted-data/agent';
import nullifyAgentServiceData from '../../../../../helpers/nullify-agent-service-data';
import nullifyAgentServiceChargeData from '../../../../../helpers/nullify-agent-service-charge-data';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent - with USING_AGENT=true and agent service data', () => {
  jest.mock('../../save-data/export-contract-agent');

  const mockCsrf = '1234';

  const mockFormBody = {
    _csrf: mockCsrf,
    [USING_AGENT]: 'false',
  };

  const mockValidationErrors = generateValidationErrors(USING_AGENT, 'error', {});

  let mockSaveExportContractAgent;
  let mockSaveExportContractAgentService;
  let mockSaveExportContractAgentServiceCharge;

  const setupMocks = () => {
    jest.resetAllMocks();

    mockSaveExportContractAgent = mockSpyPromise();
    mockSaveExportContractAgentService = mockSpyPromise();
    mockSaveExportContractAgentServiceCharge = mockSpyPromise();

    saveAgent.exportContractAgent = mockSaveExportContractAgent;
    saveAgentService.exportContractAgentService = mockSaveExportContractAgentService;
    saveAgentServiceCharge.exportContractAgentServiceCharge = mockSaveExportContractAgentServiceCharge;
  };

  describe('when the form has validation errors', () => {
    beforeEach(() => {
      setupMocks();
    });

    it('should call saveAgent.exportContractAgent', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(saveAgent.exportContractAgent).toHaveBeenCalledTimes(1);
      expect(saveAgent.exportContractAgent).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
    });

    it('should call saveAgentServiceCharge.exportContractAgentServiceCharge', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
      expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceChargeData());
    });

    it('should call saveAgentService.exportContractAgentService', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(saveAgentService.exportContractAgentService).toHaveBeenCalledTimes(1);
      expect(saveAgentService.exportContractAgentService).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceData());
    });

    it('should return true', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });

  describe('when the form does NOT have validation errors', () => {
    beforeEach(() => {
      setupMocks();
    });

    it('should call saveAgent.exportContractAgent', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

      expect(saveAgent.exportContractAgent).toHaveBeenCalledTimes(1);
      expect(saveAgent.exportContractAgent).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
    });

    it('should call saveAgentServiceCharge.exportContractAgentServiceCharge', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
      expect(saveAgentServiceCharge.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceChargeData());
    });

    it('should call saveAgentService.exportContractAgentService', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(saveAgentService.exportContractAgentService).toHaveBeenCalledTimes(1);
      expect(saveAgentService.exportContractAgentService).toHaveBeenCalledWith(mockApplication, nullifyAgentServiceData());
    });

    it('should return true', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
