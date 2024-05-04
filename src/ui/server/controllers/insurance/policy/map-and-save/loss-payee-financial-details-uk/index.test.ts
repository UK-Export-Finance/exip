import mapAndSave from '.';
import save from '../../save-data/loss-payee-financial-details-uk';
import generateValidationErrors from '../../../../../helpers/validation';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../constants/field-ids/insurance/policy';
import { mockApplication, mockLossPayeeFinancialDetailsUk, mockSpyPromise } from '../../../../../test-mocks';

const {
  LOSS_PAYEE_FINANCIAL_UK: { SORT_CODE },
} = POLICY_FIELD_IDS;

describe('controllers/insurance/policy/map-and-save/loss-payee-financial-details-uk', () => {
  jest.mock('../../save-data/loss-payee-financial-details-uk');

  const mockFormBody = {
    _csrf: '1234',
    ...mockLossPayeeFinancialDetailsUk,
  };

  const mockLossPayeeFinancialDetails = mockSpyPromise();
  save.lossPayeeFinancialDetailsUk = mockLossPayeeFinancialDetails;

  const mockValidationErrors = generateValidationErrors(SORT_CODE, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.lossPayeeFinancialDetailsUk with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.lossPayeeFinancialDetailsUk(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(1);
        expect(save.lossPayeeFinancialDetailsUk).toHaveBeenCalledWith(mockApplication, mockFormBody, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayeeFinancialDetailsUk(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.lossPayeeFinancialDetailsUk with application and populated submitted data', async () => {
        await mapAndSave.lossPayeeFinancialDetailsUk(mockFormBody, mockApplication);

        expect(save.lossPayeeFinancialDetailsUk).toHaveBeenCalledTimes(1);
        expect(save.lossPayeeFinancialDetailsUk).toHaveBeenCalledWith(mockApplication, mockFormBody);
      });

      it('should return true', async () => {
        const result = await mapAndSave.lossPayeeFinancialDetailsUk(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      const emptyMockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.lossPayeeFinancialDetailsUk(emptyMockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
