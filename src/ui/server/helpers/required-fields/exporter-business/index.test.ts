import requiredFields, { getBrokerTasks } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { FIELD_VALUES } from '../../../constants';
import { mockApplication } from '../../../test-mocks';

const {
  EXPORTER_BUSINESS: { COMPANY_HOUSE, YOUR_COMPANY, NATURE_OF_YOUR_BUSINESS, TURNOVER, BROKER },
} = FIELD_IDS;

const {
  COMPANY_ADDRESS,
  SEARCH,
  INPUT,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  COMPANY_SIC_DESCRIPTION,
  SIC_CODE,
  INDUSTRY_SECTOR_NAME,
  ...COMPANIES_HOUSE_FIELDS
} = COMPANY_HOUSE;

const { PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = YOUR_COMPANY;
const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = TURNOVER;
const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = BROKER;

describe('server/helpers/required-fields/exporter-business', () => {
  describe('getBrokerTasks', () => {
    describe(`when isUsingBroker is "${FIELD_VALUES.YES}"`, () => {
      it('should return multiple field ids in an array', () => {
        const result = getBrokerTasks(FIELD_VALUES.YES);

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

    describe(`when isUsingBroker is "${FIELD_VALUES.NO}"`, () => {
      it('should return an empty array', () => {
        const result = getBrokerTasks(FIELD_VALUES.NO);

        expect(result).toEqual([]);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(mockApplication.exporterBroker.isUsingBroker);

      const expected = Object.values({
        ...YOUR_COMPANY_FIELDS,
        ...COMPANIES_HOUSE_FIELDS,
        ...NATURE_OF_YOUR_BUSINESS,
        ...TURNOVER_FIELDS,
        USING_BROKER,
        ...getBrokerTasks(mockApplication.exporterBroker.isUsingBroker),
      });

      expect(result).toEqual(expected);
    });
  });
});
