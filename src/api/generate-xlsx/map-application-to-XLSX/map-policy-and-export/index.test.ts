import mapPolicyAndExport, { mapPolicyAndExportIntro, mapSinglePolicyFields, mapMultiplePolicyFields, mapPolicyAndExportOutro } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE, FIELD_VALUES } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import mockApplication, { mockApplicationMultiplePolicy } from '../../../test-mocks/mock-application';

const CONTENT_STRINGS = {
  ...POLICY_AND_EXPORTS_FIELDS,
  ...POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY,
  ...POLICY_AND_EXPORTS_FIELDS.ABOUT_GOODS_OR_SERVICES,
  SINGLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.SINGLE,
  MULTIPLE: POLICY_AND_EXPORTS_FIELDS.CONTRACT_POLICY.MULTIPLE,
};

const {
  TYPE_OF_POLICY: { POLICY_TYPE },
  CONTRACT_POLICY: {
    REQUESTED_START_DATE,
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    CREDIT_PERIOD_WITH_BUYER,
    POLICY_CURRENCY_CODE,
  },
  ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
} = FIELD_IDS.POLICY_AND_EXPORTS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy-and-export', () => {
  describe('mapPolicyAndExport', () => {
    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
      it('should return an array of mapped fields with single specific fields', () => {
        const result = mapPolicyAndExport(mockApplication);

        const expected = [...mapPolicyAndExportIntro(mockApplication), ...mapSinglePolicyFields(mockApplication), ...mapPolicyAndExportOutro(mockApplication)];

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
      it('should return an array of mapped fields with multiple specific fields', () => {
        const result = mapPolicyAndExport(mockApplicationMultiplePolicy);

        const expected = [
          ...mapPolicyAndExportIntro(mockApplicationMultiplePolicy),
          ...mapMultiplePolicyFields(mockApplicationMultiplePolicy),
          ...mapPolicyAndExportOutro(mockApplicationMultiplePolicy),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapPolicyAndExportIntro', () => {
    it('should return an array of mapped fields', () => {
      const result = mapPolicyAndExportIntro(mockApplication);

      const { policy } = mockApplication;

      const expected = [
        xlsxRow(XLSX.SECTION_TITLES.POLICY_AND_EXPORT, ''),
        xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policy[POLICY_TYPE]),
        xlsxRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policy[REQUESTED_START_DATE], 'dd-MMM-yy')),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapSinglePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapSinglePolicyFields(mockApplication);

      const { policy } = mockApplication;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS.SINGLE[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policy[CONTRACT_COMPLETION_DATE], 'dd-MMM-yy')),
        xlsxRow(String(CONTENT_STRINGS.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapMultiplePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapMultiplePolicyFields(mockApplicationMultiplePolicy);

      const { policy } = mockApplicationMultiplePolicy;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
        xlsxRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
        xlsxRow(String(CONTENT_STRINGS.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapPolicyAndExportOutro', () => {
    it('should return an array of mapped fields', () => {
      const result = mapPolicyAndExportOutro(mockApplication);

      const { policy } = mockApplication;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS[CREDIT_PERIOD_WITH_BUYER].SUMMARY?.TITLE), policy[CREDIT_PERIOD_WITH_BUYER]),
        xlsxRow(String(CONTENT_STRINGS[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
        xlsxRow(String(CONTENT_STRINGS[DESCRIPTION].SUMMARY?.TITLE), policy[DESCRIPTION]),
        xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION].SUMMARY?.TITLE), policy[FINAL_DESTINATION].name),
      ];

      expect(result).toEqual(expected);
    });
  });
});
