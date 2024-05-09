import mapAndSave from '.';
import save from '../../save-data/company-different-trading-address';
import generateValidationErrors from '../../../../../helpers/validation';
import { FIELD_IDS } from '../../../../../constants';
import { mockApplication, mockSpyPromise } from '../../../../../test-mocks';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS },
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS;

describe('controllers/insurance/business/map-and-save/company-different-trading-address', () => {
  jest.mock('../../save-data/company-different-trading-address');

  let mockFormBody = {
    _csrf: '1234',
    [FULL_ADDRESS]: 'mock address',
  };

  const mockSaveDifferentTradingAddress = mockSpyPromise();
  save.companyDifferentTradingAddress = mockSaveDifferentTradingAddress;

  const mockValidationErrors = generateValidationErrors(FULL_ADDRESS, 'error', {});

  describe('when the form has data', () => {
    describe('when the form has validation errors', () => {
      it('should call save.differentTradingAddress with application, populated submitted data and validationErrors.errorList', async () => {
        await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        const { _csrf, ...dataToSave } = mockFormBody;

        expect(save.companyDifferentTradingAddress).toHaveBeenCalledTimes(1);
        expect(save.companyDifferentTradingAddress).toHaveBeenCalledWith(mockApplication, dataToSave, mockValidationErrors?.errorList);
      });

      it('should return true', async () => {
        const result = await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });

    describe('when the form does NOT have validation errors', () => {
      mockFormBody = {
        _csrf: '1234',
        [FULL_ADDRESS]: 'mock address',
      };

      it('should call save.differentTradingAddress with application and populated submitted data', async () => {
        await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication);

        const { _csrf, ...dataToSave } = mockFormBody;

        expect(save.companyDifferentTradingAddress).toHaveBeenCalledTimes(1);
        expect(save.companyDifferentTradingAddress).toHaveBeenCalledWith(mockApplication, dataToSave);
      });

      it('should return true', async () => {
        const result = await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

        expect(result).toEqual(true);
      });
    });
  });

  describe('when the form does not have any data', () => {
    it('should return true', async () => {
      mockFormBody = { _csrf: '1234' };

      const result = await mapAndSave.companyDifferentTradingAddress(mockFormBody, mockApplication, mockValidationErrors);

      expect(result).toEqual(true);
    });
  });
});
