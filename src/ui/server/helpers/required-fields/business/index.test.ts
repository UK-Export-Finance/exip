import requiredFields, { getYourCompanyTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER },
} = FIELD_IDS;

const { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS } = YOUR_COMPANY;
const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;

describe('server/helpers/required-fields/business', () => {
  describe('getYourCompanyTasks', () => {
    describe('when hasDifferentTradingName is true', () => {
      it('should return relevant fields in array', () => {
        const hasDifferentTradingName = true;

        const result = getYourCompanyTasks(hasDifferentTradingName);

        const expected = [HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS];

        expect(result).toEqual(expected);
      });
    });

    describe('when hasDifferentTradingName is undefined', () => {
      it('should return an empty array', () => {
        const result = getYourCompanyTasks();

        const expected = [HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS];

        expect(result).toEqual(expected);
      });
    });

    describe('when hasDifferentTradingName is false', () => {
      it('should return an empty array', () => {
        const hasDifferentTradingName = false;

        const result = getYourCompanyTasks(hasDifferentTradingName);

        const expected = [HAS_DIFFERENT_TRADING_NAME, TRADING_ADDRESS];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(mockApplication.company.hasDifferentTradingName);

      const expected = Object.values({
        ...getYourCompanyTasks(mockApplication.company.hasDifferentTradingName),
        ...NATURE_OF_YOUR_BUSINESS,
        ...TURNOVER_FIELDS,
      });

      expect(result).toEqual(expected);
    });
  });
});
