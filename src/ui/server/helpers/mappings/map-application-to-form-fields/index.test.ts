import mapApplicationToFormFields from '.';
import { FIELD_IDS } from '../../../constants';
import formatDate from '../../date/format-date';
import getDateFieldsFromTimestamp from '../../date/get-date-fields-from-timestamp';
import { mockApplication } from '../../../test-mocks';
import mapFinancialYearEndDate from '../map-financial-year-end-date';
import displayNumberFieldValue from '../../display-number-field-value';

const {
  SUBMISSION_DEADLINE,
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
    },
  },
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { FINANCIAL_YEAR_END_DATE },
  },
} = FIELD_IDS.INSURANCE;

describe('server/helpers/mappings/map-application-to-form-fields', () => {
  it(`should return the application without mapped ${SUBMISSION_DEADLINE}`, () => {
    const simpleApplication = {
      ...mockApplication,
      [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
      policyAndExport: {
        id: mockApplication.policyAndExport.id,
      },
    };

    const result = mapApplicationToFormFields(simpleApplication);

    expect(result).toEqual(simpleApplication);
  });

  describe(`when an application has policyAndExport${REQUESTED_START_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[REQUESTED_START_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, REQUESTED_START_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an application has exporterBusiness fields', () => {
    it('should return the relevant exporterBusiness fields as timestamps', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        exporterBusiness: {
          ...mockApplication.exporterBusiness,
          [YEARS_EXPORTING]: displayNumberFieldValue(mockApplication.exporterBusiness[YEARS_EXPORTING]),
          [EMPLOYEES_UK]: displayNumberFieldValue(mockApplication.exporterBusiness[EMPLOYEES_UK]),
          [EMPLOYEES_INTERNATIONAL]: displayNumberFieldValue(mockApplication.exporterBusiness[EMPLOYEES_INTERNATIONAL]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an application has exporterBusiness fields set to 0', () => {
    it('should return the relevant exporterBusiness fields as string 0s', () => {
      const mockApplicationWithZeros = {
        ...mockApplication,
        exporterBusiness: {
          ...mockApplication.exporterBusiness,
          [YEARS_EXPORTING]: 0,
        },
      };

      const result = mapApplicationToFormFields(mockApplicationWithZeros);

      const expected = {
        ...mockApplicationWithZeros,
        [SUBMISSION_DEADLINE]: formatDate(mockApplicationWithZeros[SUBMISSION_DEADLINE]),
        exporterBusiness: {
          ...mockApplicationWithZeros.exporterBusiness,
          [YEARS_EXPORTING]: '0',
          [EMPLOYEES_UK]: displayNumberFieldValue(mockApplicationWithZeros.exporterBusiness[EMPLOYEES_UK]),
          [EMPLOYEES_INTERNATIONAL]: displayNumberFieldValue(mockApplicationWithZeros.exporterBusiness[EMPLOYEES_INTERNATIONAL]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has policyAndExport${CONTRACT_COMPLETION_DATE} field`, () => {
    it('should return additional date fields from the timestamp', () => {
      const timestamp = mockApplication.policyAndExport[CONTRACT_COMPLETION_DATE];

      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        [SUBMISSION_DEADLINE]: formatDate(mockApplication[SUBMISSION_DEADLINE]),
        policyAndExport: {
          ...mockApplication.policyAndExport,
          ...getDateFieldsFromTimestamp(timestamp, CONTRACT_COMPLETION_DATE),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe(`when an application has exporterCompany.${FINANCIAL_YEAR_END_DATE} field`, () => {
    it('should return mapped date field', () => {
      const result = mapApplicationToFormFields(mockApplication);

      const expected = {
        ...mockApplication,
        exporterCompany: {
          ...mockApplication.exporterCompany,
          [FINANCIAL_YEAR_END_DATE]: mapFinancialYearEndDate(mockApplication.exporterCompany[FINANCIAL_YEAR_END_DATE]),
        },
      };

      expect(result).toEqual(expected);
    });
  });

  describe('when an application is not passed', () => {
    it('should return an empty object', () => {
      // @ts-ignore
      const result = mapApplicationToFormFields();

      expect(result).toEqual({});
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
