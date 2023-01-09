import mapAndSave from '.';
import { FIELD_IDS } from '../../../../constants';
import mapSubmittedData from '../map-submitted-data';
import save from '../save-data';
import generateValidationErrors from '../single-contract-policy/validation';
import { mockApplication } from '../../../../test-mocks';

const {
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: { CREDIT_PERIOD_WITH_BUYER },
  },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/policy-and-export/map-and-save', () => {
  jest.mock('../save-data');

  let mockFormBody = {
    _csrf: '1234',
    [CREDIT_PERIOD_WITH_BUYER]: 'Example',
  };

  const mockValidationErrors = generateValidationErrors(mockFormBody);

  const mockSavePolicyAndExportData = jest.fn(() => Promise.resolve({}));

  save.policyAndExport = mockSavePolicyAndExportData;

  describe('when the form has data', () => {
    describe('when the form has validation errors ', () => {
      it('should call save.policyAndExport with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.policyAndExport(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.policyAndExport(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.policyAndExport with application and populated submitted data', async () => {
        await mapAndSave.policyAndExport(mockFormBody, mockApplication);

        expect(save.policyAndExport).toHaveBeenCalledTimes(1);
        expect(save.policyAndExport).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.policyAndExport(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.policyAndExport(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
