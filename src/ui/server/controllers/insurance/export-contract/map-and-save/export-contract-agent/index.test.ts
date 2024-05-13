import mapAndSave from '.';
import saveAgent from '../../save-data/export-contract-agent';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import mapSubmittedData from '../../map-submitted-data/agent';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockApplicationAgentServiceEmpty, mockSpyPromise } from '../../../../../test-mocks';

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent', () => {
  jest.mock('../../save-data/export-contract-agent');
  jest.mock('../../save-data/export-contract-agent-service');
  jest.mock('../../save-data/export-contract-agent-service-charge');

  const mockCsrf = '1234';

  const mockFormBody = {
    _csrf: mockCsrf,
    [USING_AGENT]: 'true',
  };

  const mockApplication = {
    withAgentEmptyData: mockApplicationAgentServiceEmpty,
  };

  const mockSaveExportContractAgent = mockSpyPromise();
  saveAgent.exportContractAgent = mockSaveExportContractAgent;

  const mockValidationErrors = generateValidationErrors(USING_AGENT, 'error', {});

  describe('when the form has data, USING_AGENT=true, no agent service data', () => {
    describe('when the form has validation errors', () => {
      it('should call saveAgent.exportContractAgent', async () => {
        await mapAndSave.exportContractAgent(mockFormBody, mockApplication.withAgentEmptyData, mockValidationErrors);

        expect(saveAgent.exportContractAgent).toHaveBeenCalledTimes(1);
        expect(saveAgent.exportContractAgent).toHaveBeenCalledWith(
          mockApplication.withAgentEmptyData,
          mapSubmittedData(mockFormBody),
          mockValidationErrors?.errorList,
        );
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication.withAgentEmptyData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      it('should call saveAgent.exportContractAgent', async () => {
        await mapAndSave.exportContractAgent(mockFormBody, mockApplication.withAgentEmptyData);

        expect(saveAgent.exportContractAgent).toHaveBeenCalledTimes(1);
        expect(saveAgent.exportContractAgent).toHaveBeenCalledWith(mockApplication.withAgentEmptyData, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication.withAgentEmptyData, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.exportContractAgent(emptyMockFormBody, mockApplication.withAgentEmptyData, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
