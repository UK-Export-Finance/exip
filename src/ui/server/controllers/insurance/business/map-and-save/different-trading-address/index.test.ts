import mapAndSave from '.';
import save from '../../save-data/different-trading-address';
import mapSubmittedData from '../../map-submitted-data/different-trading-address';
import { mockApplication } from '../../../../../test-mocks';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';

const {
  EXPORTER_BUSINESS: { ALTERNATIVE_TRADING_ADDRESS },
} = FIELD_IDS.INSURANCE;

describe('controllers/insurance/business/map-and-save/different-trading-address', () => {
  jest.mock('../../save-data/different-trading-address');

  let mockFormBody = {
    _csrf: '1234',
    [ALTERNATIVE_TRADING_ADDRESS]: 'test',
  };

  const mockSaveDifferentTradingAddress = jest.fn(() => Promise.resolve({}));
  save.differentTradingAddress = mockSaveDifferentTradingAddress;

  const mockValidationErrors = generateValidationErrors(ALTERNATIVE_TRADING_ADDRESS, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.differentTradingAddress with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.differentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        expect(save.differentTradingAddress).toHaveBeenCalledTimes(1);
        expect(save.differentTradingAddress).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody), mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.differentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors ', () => {
      mockFormBody = {
        _csrf: '1234',
        [ALTERNATIVE_TRADING_ADDRESS]: 'test',
      };

      it('should call save.differentTradingAddress with application and populated submitted data', async () => {
        await mapAndSave.differentTradingAddress(mockFormBody, mockApplication);

        expect(save.differentTradingAddress).toHaveBeenCalledTimes(1);
        expect(save.differentTradingAddress).toHaveBeenCalledWith(mockApplication, mapSubmittedData(mockFormBody));
      });

      it('should return true', async () => {
        const result = await mapAndSave.differentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.differentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
