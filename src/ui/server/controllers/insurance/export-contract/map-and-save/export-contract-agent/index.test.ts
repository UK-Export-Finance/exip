import mapAndSave from '.';
import save from '../../save-data/export-contract-agent';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';

const { USING_AGENT } = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent', () => {
  jest.mock('../../save-data/export-contract-agent');

  let mockFormBody = {
    _csrf: '1234',
    [USING_AGENT]: mockApplication.exportContract.agent[USING_AGENT],
  };

  const mockSaveExportContract = jest.fn(() => Promise.resolve({}));
  save.exportContractAgent = mockSaveExportContract;

  const mockValidationErrors = generateValidationErrors(USING_AGENT, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.exportContractAgent with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.exportContractAgent).toHaveBeenCalledTimes(1);
        expect(save.exportContractAgent).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.exportContractAgent with application and submitted data', async () => {
        await mapAndSave.exportContractAgent(mockFormBody, mockApplication);

        expect(save.exportContractAgent).toHaveBeenCalledTimes(1);
        expect(save.exportContractAgent).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.exportContractAgent(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});