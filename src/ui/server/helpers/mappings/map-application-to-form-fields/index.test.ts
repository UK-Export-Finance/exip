import mapApplicationToFormFields from '.';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import mapNameFields from '../map-name-fields';
import mapTextareaFields from '../map-textarea-fields';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import { mockApplication } from '../../../test-mocks';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import transformNumberToString from '../../transform-number-to-string';
import mapNominatedLossPayeeLocation from '../map-nominated-loss-payee-location';
import { transformEmptyDecimalsToWholeNumber } from '../../number';
import { Application } from '../../../../types';

const {
  CURRENCY: { CURRENCY_CODE },
  SUBMISSION_DEADLINE,
  POLICY: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
      POLICY_CURRENCY_CODE,
    },
    LOSS_PAYEE_DETAILS: { LOCATION },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE, PERCENTAGE_TURNOVER, ESTIMATED_ANNUAL_TURNOVER },
  },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { FIXED_SUM_AMOUNT },
  },
} = INSURANCE_FIELD_IDS;

const { business, company, policy } = mockApplication;

describe('server/helpers/mappings/map-application-to-form-fields', () => {
  it(`should return the application with a mapped ${SUBMISSION_DEADLINE}`, () => {
    const result = mapApplicationToFormFields(mockApplication) as Application;

    const expected = formatDate(new Date(mockApplication[SUBMISSION_DEADLINE]));

    expect(result[SUBMISSION_DEADLINE]).toEqual(expected);
  });

  it('should return mapped business data', () => {
    const result = mapApplicationToFormFields(mockApplication) as Application;

    const expected = {
      ...mockApplication.business,
      [YEARS_EXPORTING]: transformNumberToString(Number(mockApplication.business[YEARS_EXPORTING])),
      [EMPLOYEES_UK]: transformNumberToString(Number(mockApplication.business[EMPLOYEES_UK])),
      [PERCENTAGE_TURNOVER]: transformNumberToString(Number(mockApplication.business[PERCENTAGE_TURNOVER])),
      [ESTIMATED_ANNUAL_TURNOVER]: transformNumberToString(Number(mockApplication.business[ESTIMATED_ANNUAL_TURNOVER])),
    };

    expect(result.business).toEqual(expected);
  });

  describe(`when an application has company.${FINANCIAL_YEAR_END_DATE} field`, () => {
    it('should return mapped company', () => {
      const result = mapApplicationToFormFields(mockApplication) as Application;

      const expected = mapFinancialYearEndDate(mockApplication.company[FINANCIAL_YEAR_END_DATE]);

      expect(result.company[FINANCIAL_YEAR_END_DATE]).toEqual(expected);
    });
  });

  it('should return mapped name and textarea fields', () => {
    const minimalApplication = {
      ...mockApplication,
      business: {
        ...business,
        [YEARS_EXPORTING]: undefined,
        [EMPLOYEES_UK]: undefined,
        [PERCENTAGE_TURNOVER]: undefined,
        [ESTIMATED_ANNUAL_TURNOVER]: undefined,
      },
      nominatedLossPayee: {
        ...mockApplication.nominatedLossPayee,
        [LOCATION]: mapNominatedLossPayeeLocation(mockApplication.nominatedLossPayee),
      },
      company: {
        ...company,
        [FINANCIAL_YEAR_END_DATE]: undefined,
      },
      policy: {
        id: policy.id,
        jointlyInsuredParty: {
          id: policy.jointlyInsuredParty.id,
        },
      },
    };

    const result = mapApplicationToFormFields(minimalApplication);

    const expected = {
      ...minimalApplication,
      ...mapNameFields(minimalApplication),
      ...mapTextareaFields(minimalApplication),
      [SUBMISSION_DEADLINE]: formatDate(new Date(minimalApplication[SUBMISSION_DEADLINE])),
    };

    expect(result).toEqual(expected);
  });

  it('should return mapped policy data with date fields from timestamps', () => {
    const result = mapApplicationToFormFields(mockApplication) as Application;

    const timestampStart = new Date(mockApplication.policy[REQUESTED_START_DATE]!);
    const timestampEnd = new Date(mockApplication.policy[CONTRACT_COMPLETION_DATE]!);

    const expected = {
      ...mockApplication.policy,
      ...getDateFieldsFromTimestamp(timestampStart, REQUESTED_START_DATE),
      ...getDateFieldsFromTimestamp(timestampEnd, CONTRACT_COMPLETION_DATE),
      [CURRENCY_CODE]: mockApplication.policy[POLICY_CURRENCY_CODE],
    };

    expect(result.policy).toEqual(expected);
  });

  it(`should return mapped nominatedLossPayee data with ${LOCATION} populated from mapNominatedLossPayeeLocation`, () => {
    const result = mapApplicationToFormFields(mockApplication) as Application;

    const expected = {
      ...mockApplication.nominatedLossPayee,
      [LOCATION]: mapNominatedLossPayeeLocation(mockApplication.nominatedLossPayee),
    };

    expect(result.nominatedLossPayee).toEqual(expected);
  });

  describe(`when an application has a ${FIXED_SUM_AMOUNT} field`, () => {
    it(`should return the result of transformEmptyDecimalsToWholeNumber for ${FIXED_SUM_AMOUNT}`, () => {
      mockApplication.exportContract.agent.service.charge[FIXED_SUM_AMOUNT] = '1000.00';
      const result = mapApplicationToFormFields(mockApplication) as Application;

      const expectedResult = result.exportContract.agent.service.charge[FIXED_SUM_AMOUNT];

      const expected = transformEmptyDecimalsToWholeNumber(mockApplication.exportContract.agent.service.charge[FIXED_SUM_AMOUNT]);

      expect(expectedResult).toEqual(expected);
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
