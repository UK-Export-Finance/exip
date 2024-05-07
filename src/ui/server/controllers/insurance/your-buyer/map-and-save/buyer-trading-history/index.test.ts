import mapAndSave from '.';
import INSURANCE_FIELD_IDS from '../../../../../constants/field-ids/insurance';
import save from '../../save-data/buyer-trading-history';
import generateValidationErrors from '../../../../../helpers/validation';
import mapSubmittedData from '../../map-submitted-data/buyer-trading-history';
import { GBP } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
  YOUR_BUYER: { FAILED_PAYMENTS },
} = INSURANCE_FIELD_IDS;

describe('controllers/insurance/your-buyer/map-and-save/buyer-trading-history', () => {
  jest.mock('../../save-data/buyer-trading-history');

  let mockFormBody = {
    _csrf: '1234',
    [CURRENCY_CODE]: GBP,
    [ALTERNATIVE_CURRENCY_CODE]: '',
    [FAILED_PAYMENTS]: true,
  };

  const mockSaveBuyer = mockSpyPromise();
  save.buyerTradingHistory = mockSaveBuyer;

  const mockValidationErrors = generateValidationErrors(CURRENCY_CODE, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.buyerTradingHistory with application, submitted data and validationErrors.errorList', async () => {
        await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.buyerTradingHistory).toHaveBeenCalledTimes(1);
        expect(save.buyerTradingHistory).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      it('should call save.buyer with application and submitted data', async () => {
        await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication);

        expect(save.buyerTradingHistory).toHaveBeenCalledTimes(1);
        expect(save.buyerTradingHistory).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.buyerTradingHistory(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
