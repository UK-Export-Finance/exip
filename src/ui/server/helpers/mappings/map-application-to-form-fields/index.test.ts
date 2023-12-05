import mapApplicationToFormFields from '.';
import { FIELD_IDS } from '../../../constants';
import mapNameFields from '../map-name-fields';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import { mockApplication } from '../../../test-mocks';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../transform-number-to-string';

const {
  SUBMISSION_DEADLINE,
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE, PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
    FULL_ADDRESS,
    ALTERNATIVE_TRADING_ADDRESS,
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/mappings/map-application-to-form-fields', () => {
  it(`should return the application without mapped ${SUBMISSION_DEADLINE}`, () => {
    const simpleApplication = {
      ...mockApplication,
      [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
      policy: {
        id: mockApplication.policy.id,
      },
    };

    const result = mapApplicationToFormFields(simpleApplication);

    const expected = mapNameFields(simpleApplication);

    expect(result).toEqual(expected);
  });

  describe(`when an application has policy.${REQUESTED_START_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policy[REQUESTED_START_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = mapNameFields({
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policy: {
          ...mockApplication.policy,
          ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
        },
      });

      expect(result).toEqual(expected);
    });
  });

  describe('when an application has business fields', () => {
    it('should return the relevant business fields', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = mapNameFields({
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        business: {
          ...mockApplication.business,
          [YEARS_EXPORTING]: transformNumberToString(mockApplication.business[YEARS_EXPORTING]),
          [EMPLOYEES_UK]: transformNumberToString(mockApplication.business[EMPLOYEES_UK]),
          [PERCENTAGE_TURNOVER]: transformNumberToString(mockApplication.business[PERCENTAGE_TURNOVER]),
          [ESTIMATED_ANNUAL_TURNOVER]: transformNumberToString(mockApplication.business[ESTIMATED_ANNUAL_TURNOVER]),
        },
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has policy.${CONTRACT_COMPLETION_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policy[CONTRACT_COMPLETION_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = mapNameFields({
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policy: {
          ...mockApplication.policy,
          ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
        },
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has company.${FINANCIAL_YEAR_END_DATE} field`, () => {
    it('should return mapped date field', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = mapNameFields({
        ...mockApplication,
        company: {
          ...mockApplication.company,
          [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(mockApplication.company[FINANCIAL_YEAR_END_DATE]),
        },
      });

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has company.${FINANCIAL_YEAR_END_DATE} field`, () => {
    it('should return mapped date field', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = mapNameFields({
        ...mockApplication,
        differentTradingAddress: {
          ...mockApplication.differentTradingAddress,
          [ALTERNATIVE_TRADING_ADDRESS]: mockApplication.differentTradingAddress[FULL_ADDRESS],
        },
      });

      expect(result).toEqual(expected);
    });
  });

  describe('when an empty application is passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields({});

      expect(result).toEqual({});
    });
  });
});
