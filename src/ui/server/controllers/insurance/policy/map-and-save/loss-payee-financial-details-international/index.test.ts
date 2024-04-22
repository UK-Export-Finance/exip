import mapAndSave from '.';
import save from '../../save-data/loss-payee-financial-details-international';
import { mockApplication, mockLossPayeeFinancialDetailsInternational } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';

const {
  LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { BIC_SWIFT_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/loss-payee-financial-details-international', () => {
  jest.mock('../../save-data/loss-payee-financial-details-international');

  const mockFormBody = {
    _csrf: '1234',
    ...mockLossPayeeFinancialDetailsInternational,
  };

  const mockLossPayeeFinancialDetails = jest.fn(() => Promise.resolve({}));
  save.lossPayeeFinancialDetailsInternational = mockLossPayeeFinancialDetails;

  const mockValidationErrors = generateValidationErrors(BIC_SWIFT_CODE, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.lossPayeeFinancialDetailsInternational with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.lossPayeeFinancialDetailsInternational(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.lossPayeeFinancialDetailsInternational).toHaveBeenCalledTimes(1);
        expect(save.lossPayeeFinancialDetailsInternational).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayeeFinancialDetailsInternational(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.lossPayeeFinancialDetailsInternational with application and populated submitted data', async () => {
        await mapAndSave.lossPayeeFinancialDetailsInternational(mockFormBody, mockApplication);

        expect(save.lossPayeeFinancialDetailsInternational).toHaveBeenCalledTimes(1);
        expect(save.lossPayeeFinancialDetailsInternational).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayeeFinancialDetailsInternational(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.lossPayeeFinancialDetailsInternational(emptyMockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
