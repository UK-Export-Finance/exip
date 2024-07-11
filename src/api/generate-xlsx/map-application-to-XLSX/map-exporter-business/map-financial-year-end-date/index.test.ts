import mapFinancialYearEndDate from '.';
import { DATE_FORMAT } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/business';
import { XLSX } from '../../../../content-strings';
import formatDate from '../../../../helpers/format-date';
import { mockApplication } from '../../../../test-mocks';

const {
  COMPANIES_HOUSE: { FINANCIAL_YEAR_END_DATE },
} = FIELD_IDS;

const { FIELDS } = XLSX;

describe('api/generate-xlsx/map-application-to-xlsx/map-exporter-business/map-financial-year-end-date', () => {
  describe(`when a company has a ${FINANCIAL_YEAR_END_DATE}`, () => {
    it('should return a formatted date', () => {
      const now = new Date();

      const mockCompany = {
        ...mockApplication.company,
        [FINANCIAL_YEAR_END_DATE]: now,
      };

      const result = mapFinancialYearEndDate(mockCompany);

      const expected = formatDate(mockCompany[FINANCIAL_YEAR_END_DATE], DATE_FORMAT.XLSX);

      expect(result).toEqual(expected);
    });
  });

  describe(`when a company does NOT have a ${FINANCIAL_YEAR_END_DATE}`, () => {
    it(`should return ${FIELDS.NO_FINANCIAL_YEAR_END_DATE}`, () => {
      const mockCompany = {
        ...mockApplication.company,
        [FINANCIAL_YEAR_END_DATE]: null,
      };

      const result = mapFinancialYearEndDate(mockCompany);

      const expected = FIELDS.NO_FINANCIAL_YEAR_END_DATE;

      expect(result).toEqual(expected);
    });
  });
});
