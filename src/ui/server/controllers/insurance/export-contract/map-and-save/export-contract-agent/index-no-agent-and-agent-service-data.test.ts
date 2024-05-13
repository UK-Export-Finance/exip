import mapAndSave from '.';
import saveAgent from '../../save-data/export-contract-agent';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import mapSubmittedData from '../../map-submitted-data/agent';
import nullify from '../nullify-export-contract-agent-service';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent - with USING_AGENT=true and agent service data', () => {
  jest.mock('../../save-data/export-contract-agent');
  jest.mock('../nullify-export-contract-agent-service');

  const mockCsrf = '1234';

  const mockFormBody = {
    _csrf: mockCsrf,
    [USING_AGENT]: 'false',
  };

  const mockValidationErrors = generateValidationErrors(USING_AGENT, 'error', {});

  let mockSaveExportContractAgent;
  let mockNullifyExportContractAgentServiceAndCharge;

  const setupMocks = () => {
    jest.resetAllMocks();

    mockSaveExportContractAgent = mockSpyPromise();
    mockNullifyExportContractAgentServiceAndCharge = mockSpyPromise();

    saveAgent.exportContractAgent = mockSaveExportContractAgent;
    nullify.exportContractAgentServiceAndCharge = mockNullifyExportContractAgentServiceAndCharge;
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

    it('should call nullify.exportContractAgentServiceAndCharge', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(nullify.exportContractAgentServiceAndCharge).toHaveBeenCalledTimes(1);
      expect(nullify.exportContractAgentServiceAndCharge).toHaveBeenCalledWith(mockApplication);
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

    it('should call nullify.exportContractAgentServiceAndCharge', async () => {
      await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(nullify.exportContractAgentServiceAndCharge).toHaveBeenCalledTimes(1);
      expect(nullify.exportContractAgentServiceAndCharge).toHaveBeenCalledWith(mockApplication);
    });

    it('should return true', async () => {
      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
