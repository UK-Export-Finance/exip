import mapPolicyAndExport, { mapSinglePolicyFields, mapMultiplePolicyFields } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { CSV } from '../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE, FIELD_VALUES } from '../../../constants';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import mockApplication, { mockApplicationMultiplePolicy } from '../../../test-mocks/mock-application';

const CONTENT_STRINGS = {
  ...POLICY_AND_EXPORTS_FIELDS,
  ...POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY,
  SINGLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.SINGLE,
  MULTIPLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.MULTIPLE,
};

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS.POLICY_AND_EXPORTS;

describe('api/generate-csv/map-application-to-csv/map-policy-and-export', () => {
  describe('mapPolicyAndExport', () => {
    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
      it('should return an array of mapped fields with single specific fields', () => {
        const result = mapPolicyAndExport(mockApplication);

        const { policyAndExport } = mockApplication;

        const expected = [
          csvRow(CSV.SECTION_TITLES.POLICY_AND_EXPORT, ''),
          csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
          csvRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE])),
          ...mapSinglePolicyFields(mockApplication),
        ];

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
      it('should return an array of mapped fields with multiple specific fields', () => {
        const result = mapPolicyAndExport(mockApplicationMultiplePolicy);

        const { policyAndExport } = mockApplicationMultiplePolicy;

        const expected = [
          csvRow(CSV.SECTION_TITLES.POLICY_AND_EXPORT, ''),
          csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
          csvRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE])),
          ...mapMultiplePolicyFields(mockApplicationMultiplePolicy),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapSinglePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapSinglePolicyFields(mockApplication);

      const { policyAndExport } = mockApplication;

      const expected = [
        csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
        csvRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE])),
        csvRow(String(CONTENT_STRINGS.SINGLE[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[CONTRACT_COMPLETION_DATE])),
        csvRow(String(CONTENT_STRINGS.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapMultiplePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapMultiplePolicyFields(mockApplicationMultiplePolicy);

      const { policyAndExport } = mockApplicationMultiplePolicy;

      const expected = [
        csvRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policyAndExport[TOTAL_MONTHS_OF_COVER])),
        csvRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
        csvRow(
          String(CONTENT_STRINGS.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE),
          formatCurrency(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE),
        ),
      ];

      expect(result).toEqual(expected);
    });
  });
});
