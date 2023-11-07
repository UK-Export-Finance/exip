import mapFinancialYearEndDate from './map-financial-year-end-date';
import formatDate from '../date/format-date';

import { FIELD_IDS } from '../../constants';
import { FIELDS } from '../../content-strings/fields/insurance/your-business';

const { FINANCIAL_YEAR_END_DATE } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

const {
  TURNOVER: {
    [FINANCIAL_YEAR_END_DATE]: { DATE_FORMAT },
  },
} = FIELDS;

describe('server/controllers/insurance/business/turnover/helpers/map-financial-year-end-date', () => {
  describe(`when ${FINANCIAL_YEAR_END_DATE} is provided`, () => {
    it('should return formatted timestamp', () => {
      const response = mapFinancialYearEndDate(new Date());

      const expected = formatDate(new Date(), DATE_FORMAT);

      expect(response).toEqual(expected);
    });
  });

  describe(`when ${FINANCIAL_YEAR_END_DATE} is undefined`, () => {
    it('should return formatted timestamp', () => {
      const response = mapFinancialYearEndDate();

      expect(response).toBeNull();
    });
  });

  describe(`when ${FINANCIAL_YEAR_END_DATE} is not provided`, () => {
    it('should return formatted timestamp', () => {
      const response = mapFinancialYearEndDate();

      expect(response).toBeNull();
    });
  });
});
