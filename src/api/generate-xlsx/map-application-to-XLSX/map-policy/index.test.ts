import mapPolicy, { mapPolicyIntro, mapSinglePolicyFields, mapMultiplePolicyFields, mapPolicyOutro } from '.';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { POLICY_FIELDS, EXPORT_CONTRACT_FIELDS } from '../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE, FIELD_VALUES } from '../../../constants';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import getPopulatedApplication from '../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../test-helpers';
import { Application, Context } from '../../../types';

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
  ...POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
  ...POLICY_FIELDS.EXPORT_VALUE.MULTIPLE,
  ...EXPORT_CONTRACT_FIELDS.ABOUT_GOODS_OR_SERVICES,
};

const {
  POLICY: {
    TYPE_OF_POLICY: { POLICY_TYPE },
    CONTRACT_POLICY: {
      REQUESTED_START_DATE,
      SINGLE: { CONTRACT_COMPLETION_DATE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
      POLICY_CURRENCY_CODE,
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy', () => {
  let populatedApplication: Application;
  let populatedApplicationMultiplePolicy: Application;
  let application: Application;
  let applicationIds: object;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = await createFullApplication(context);

    applicationIds = mapApplicationIds(application);

    populatedApplication = await getPopulatedApplication(context, applicationIds);

    const multiplePolicyApplication = await createFullApplication(context, FIELD_VALUES.POLICY_TYPE.MULTIPLE);

    populatedApplicationMultiplePolicy = await getPopulatedApplication(context, mapApplicationIds(multiplePolicyApplication));
  });

  describe('mapPolicy', () => {
    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.SINGLE}`, () => {
      it('should return an array of mapped fields with single specific fields', () => {
        const result = mapPolicy(populatedApplication);

        const expected = [...mapPolicyIntro(populatedApplication), ...mapSinglePolicyFields(populatedApplication), ...mapPolicyOutro(populatedApplication)];

        expect(result).toEqual(expected);
      });
    });

    describe(`when the policy type is ${FIELD_VALUES.POLICY_TYPE.MULTIPLE}`, () => {
      it('should return an array of mapped fields with multiple specific fields', () => {
        const result = mapPolicy(populatedApplicationMultiplePolicy);

        const expected = [
          ...mapPolicyIntro(populatedApplicationMultiplePolicy),
          ...mapMultiplePolicyFields(populatedApplicationMultiplePolicy),
          ...mapPolicyOutro(populatedApplicationMultiplePolicy),
        ];

        expect(result).toEqual(expected);
      });
    });
  });

  describe('mapPolicyIntro', () => {
    it('should return an array of mapped fields', () => {
      const result = mapPolicyIntro(populatedApplication);

      const { policy } = populatedApplication;

      const expected = [
        xlsxRow(XLSX.SECTION_TITLES.POLICY, ''),
        xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policy[POLICY_TYPE]),
        xlsxRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policy[REQUESTED_START_DATE], 'dd-MMM-yy')),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapSinglePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapSinglePolicyFields(populatedApplication);

      const { policy } = populatedApplication;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policy[CONTRACT_COMPLETION_DATE], 'dd-MMM-yy')),
        xlsxRow(String(CONTENT_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapMultiplePolicyFields', () => {
    it('should return an array of mapped fields', () => {
      const result = mapMultiplePolicyFields(populatedApplicationMultiplePolicy);

      const { policy } = populatedApplicationMultiplePolicy;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
        xlsxRow(String(CONTENT_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
        xlsxRow(String(CONTENT_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
      ];

      expect(result).toEqual(expected);
    });
  });

  describe('mapPolicyOutro', () => {
    it('should return an array of mapped fields', async () => {
      const result = mapPolicyOutro(populatedApplication);

      const { exportContract, policy } = populatedApplication;

      const expected = [
        xlsxRow(String(CONTENT_STRINGS[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
        xlsxRow(String(CONTENT_STRINGS[DESCRIPTION].SUMMARY?.TITLE), exportContract[DESCRIPTION]),
        xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION].SUMMARY?.TITLE), exportContract[FINAL_DESTINATION].name),
      ];

      expect(result).toEqual(expected);
    });
  });
});
