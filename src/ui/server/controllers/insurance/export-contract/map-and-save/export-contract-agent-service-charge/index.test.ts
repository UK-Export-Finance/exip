import mapAndSave from '.';
import mapSubmittedData from '../../map-submitted-data/agent-service-charge';
import save from '../../save-data/export-contract-agent-service-charge';
import EXPORT_CONTRACT_FIELD_IDS from '../../../../../constants/field-ids/insurance/export-contract';
import generateValidationErrors from '../../../../../helpers/validation';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  AGENT_SERVICE: { IS_CHARGING },
  AGENT_CHARGES: { PERCENTAGE_CHARGE },
} = EXPORT_CONTRACT_FIELD_IDS;

describe('controllers/insurance/export-contract/map-and-save/export-contract-agent-service-charge', () => {
  jest.mock('../../save-data/export-contract-agent-service');

  let mockFormBody = {
    _csrf: '1234',
    [PERCENTAGE_CHARGE]: mockApplication.exportContract.agent.service.charge[PERCENTAGE_CHARGE],
  };

  const mockSave = mockSpyPromise;
  save.exportContractAgentServiceCharge = mockSave;

  const populatedData = mapSubmittedData(mockFormBody);

  const mockValidationErrors = generateValidationErrors(IS_CHARGING, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.exportContractAgentServiceCharge with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
        expect(save.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication, populatedData, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.exportContractAgentServiceCharge with application and populated submitted data', async () => {
        await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication);

        expect(save.exportContractAgentServiceCharge).toHaveBeenCalledTimes(1);
        expect(save.exportContractAgentServiceCharge).toHaveBeenCalledWith(mockApplication, populatedData);
      });

      it('should return true', async () => {
        const result = await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.exportContractAgentServiceCharge(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
