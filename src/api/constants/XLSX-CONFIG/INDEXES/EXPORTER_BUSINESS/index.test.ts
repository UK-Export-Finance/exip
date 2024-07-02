import EXPORT_BUSINESS_INDEXES, { DEFAULT_INDEXES } from '.';
import { mockApplication } from '../../../../test-mocks';

describe('api/constants/XLSX-CONFIG/INDEXES/EXPORT_BUSINESS', () => {
  describe('DEFAULT_INDEXES', () => {
    it('should return an object with indexes', () => {
      const expected = {
        REGISTERED_OFFICE_ADDRESS: 3,
        COMPANY_SIC_CODES: 4,
        ALTERNATIVE_TRADING_ADDRESS: 0,
      };

      expect(DEFAULT_INDEXES()).toEqual(expected);
    });
  });

  describe('EXPORT_BUSINESS_INDEXES', () => {
    describe('when fullAddress is populated, hasDifferentTradingName=false', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.company.differentTradingAddress.fullAddress = 'Mock address';
        application.company.hasDifferentTradingName = false;

        const result = EXPORT_BUSINESS_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          ALTERNATIVE_TRADING_ADDRESS: DEFAULT_INDEXES().ALTERNATIVE_TRADING_ADDRESS + 7,
        };

        expect(result).toEqual(expected);
      });
    });

    describe('when fullAddress is populated, hasDifferentTradingName=true', () => {
      it('should return an object with indexes', () => {
        const application = mockApplication;

        application.company.differentTradingAddress.fullAddress = 'Mock address';
        application.company.hasDifferentTradingName = true;

        const result = EXPORT_BUSINESS_INDEXES(application);

        const expected = {
          ...DEFAULT_INDEXES(),
          ALTERNATIVE_TRADING_ADDRESS: DEFAULT_INDEXES().ALTERNATIVE_TRADING_ADDRESS + 8,
        };

        expect(result).toEqual(expected);
      });
    });
  });
});
