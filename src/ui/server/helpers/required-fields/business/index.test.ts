import requiredFields, { getBrokerTasks, getYourCompanyTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const { HAS_DIFFERENT_TRADING_NAME, DIFFERENT_TRADING_NAME, TRADING_ADDRESS } = YOUR_COMPANY;
const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;
const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = BROKER;

describe('server/helpers/required-fields/business', () => {
  describe('getBrokerTasks', () => {
    describe('when isUsingBroker is true', () => {
      it('should return multiple field ids in an array', () => {
        const isUsingBroker = true;

        const result = getBrokerTasks(isUsingBroker);

        const expected = [NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is undefined', () => {
      it('should return an empty array', () => {
        const result = getBrokerTasks();

        expect(result).toEqual([]);
      });
    });

    describe('when isUsingBroker is false', () => {
      it('should return an empty array', () => {
        const isUsingBroker = false;

        const result = getBrokerTasks(isUsingBroker);

        expect(result).toEqual([]);
      });
    });
  });

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
      const result = requiredFields(mockApplication.broker.isUsingBroker, mockApplication.company.hasDifferentTradingName);

      const expected = Object.values({
        ...getYourCompanyTasks(mockApplication.company.hasDifferentTradingName),
        ...NATURE_OF_YOUR_BUSINESS,
        ...TURNOVER_FIELDS,
        USING_BROKER,
        ...getBrokerTasks(mockApplication.broker.isUsingBroker),
      });

      expect(result).toEqual(expected);
    });
  });
});
