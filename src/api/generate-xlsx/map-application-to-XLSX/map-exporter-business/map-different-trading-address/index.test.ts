import mapDifferentTradingAddress from '.';
import { XLSX } from '../../../../content-strings';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import xlsxRow from '../../helpers/xlsx-row';
import mockApplication from '../../../../test-mocks/mock-application';

const {
  ALTERNATIVE_TRADING_ADDRESS: { FULL_ADDRESS, FULL_ADDRESS_DOT_NOTATION },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business/map-different-trading-address', () => {
  describe('when a company has a different trading address', () => {
    it('should return an xlsxRow', () => {
      const differentTradingAddressValue = 'Mock full address';

      const mockCompany = {
        ...mockApplication.company,
        differentTradingAddress: {
          ...mockApplication.company.differentTradingAddress,
          [FULL_ADDRESS]: differentTradingAddressValue,
        },
      };

      const result = mapDifferentTradingAddress(mockCompany);

      const expected = xlsxRow(String(FIELDS[FULL_ADDRESS_DOT_NOTATION]), differentTradingAddressValue);

      expect(result).toEqual(expected);
    });
  });

  describe('when a company does NOT have a different trading address', () => {
    it('should not return anything', () => {
      const mockCompany = {
        ...mockApplication.company,
        differentTradingAddress: {
          ...mockApplication.company.differentTradingAddress,
          [FULL_ADDRESS]: null,
        },
      };

      const result = mapDifferentTradingAddress(mockCompany);

      expect(result).toBeUndefined();
    });
  });
});
