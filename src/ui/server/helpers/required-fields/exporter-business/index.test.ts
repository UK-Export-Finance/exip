import { FIELD_IDS } from '../../../constants';
import { mockApplication } from '../../../test-mocks';
import requiredFields, { getBrokerTasks } from '.';

const {
  COMPANY_ADDRESS,
  SEARCH,
  INPUT,
  REGISTED_OFFICE_ADDRESS,
  COMPANY_SIC,
  COMPANY_INCORPORATED,
  FINANCIAL_YEAR_END_DATE: FINANCIAL_YEAR_END_DATE_COMPANY_HOUSE,
  ...COMPANIES_HOUSE_FIELDS
} = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.COMPANY_HOUSE;
const { PHONE_NUMBER, WEBSITE, YOUR_BUSINESS, ...YOUR_COMPANY_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.YOUR_COMPANY;
const { FINANCIAL_YEAR_END_DATE, ...TURNOVER_FIELDS } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.TURNOVER;

describe('server/helpers/required-fields/exporter-business', () => {
  describe('getBrokerTasks', () => {
    const { USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL } = FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.BROKER;

    describe('when isUsingBroker is "Yes"', () => {
      it('should return multiple field ids in an array', () => {
        const result = getBrokerTasks('Yes');

        const expected = [USING_BROKER, NAME, ADDRESS_LINE_1, TOWN, POSTCODE, EMAIL];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is "No"', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks('No');

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });

    describe('when isUsingBroker is undefined', () => {
      it('should return a single field id in an array', () => {
        const result = getBrokerTasks();

        const expected = [USING_BROKER];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('requiredFields', () => {
    it('should return array of required fields', () => {
      const result = requiredFields(mockApplication.exporterBroker.isUsingBroker);

      const expected = Object.values({
        ...YOUR_COMPANY_FIELDS,
        ...COMPANIES_HOUSE_FIELDS,
        ...FIELD_IDS.INSURANCE.EXPORTER_BUSINESS.NATURE_OF_YOUR_BUSINESS,
        ...TURNOVER_FIELDS,
        ...getBrokerTasks(mockApplication.exporterBroker.isUsingBroker),
      });

      expect(result).toEqual(expected);
    });
  });
});
