import requiredFields, { getBrokerTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE, YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const {
  SEARCH,
  COMPANY_ADDRESS,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  INDUSTRY_SECTOR_NAMES,
  SIC_CODE,
  OLD_SIC_CODES,
  INDUSTRY_SECTOR_NAME,
  ...COMPANIES_HOUSE_FIELDS
} = COMPANY_HOUSE;

const { ADDRESS, PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = YOUR_COMPANY;
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

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(mockApplication.broker.isUsingBroker);

      const expected = Object.values({
        ...YOUR_COMPANY_FIELDS,
        ...COMPANIES_HOUSE_FIELDS,
        ...NATURE_OF_YOUR_BUSINESS,
        ...TURNOVER_FIELDS,
        USING_BROKER,
        ...getBrokerTasks(mockApplication.broker.isUsingBroker),
      });

      expect(result).toEqual(expected);
    });
  });
});
