import mapDifferentTradingName from '.';
import { XLSX } from '../../../../content-strings';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import xlsxRow from '../../helpers/xlsx-row';
import mockApplication from '../../../../test-mocks/mock-application';

const { FIELDS } = XLSX;

const {
  YOUR_COMPANY: { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business/map-different-trading-name', () => {
  describe(`when a company has a ${HAS_DIFFERENT_TRADING_NAME} value of true`, () => {
    it('should return an xlsxRow', () => {
      const mockCompany = {
        ...mockApplication.company,
        [HAS_DIFFERENT_TRADING_NAME]: true,
      };

      const result = mapDifferentTradingName(mockCompany);

      const expected = xlsxRow(FIELDS[DIFFERENT_TRADING_NAME], mockCompany[DIFFERENT_TRADING_NAME]);

      expect(result).toEqual(expected);
    });
  });

  describe(`when a company has a ${HAS_DIFFERENT_TRADING_NAME} value of false`, () => {
    it('should not return anything', () => {
      const mockCompany = {
        ...mockApplication.company,
        [HAS_DIFFERENT_TRADING_NAME]: false,
      };

      const result = mapDifferentTradingName(mockCompany);

      expect(result).toBeUndefined();
    });
  });

  describe(`when a company has a ${HAS_DIFFERENT_TRADING_NAME} value of undefined`, () => {
    it('should not return anything', () => {
      const mockCompany = {
        ...mockApplication.company,
        [HAS_DIFFERENT_TRADING_NAME]: undefined,
      };

      const result = mapDifferentTradingName(mockCompany);

      expect(result).toBeUndefined();
    });
  });
});
