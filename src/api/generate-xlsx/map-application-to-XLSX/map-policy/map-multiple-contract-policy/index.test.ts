import mapMultipleContractPolicy from '.';
import { FIELD_VALUES, GBP_CURRENCY_CODE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import mapMonthString from '../../helpers/map-month-string';
import formatCurrency from '../../helpers/format-currency';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../../test-helpers';
import { Application, Context } from '../../../../types';

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...POLICY_FIELDS.EXPORT_VALUE.MULTIPLE,
};

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      POLICY_CURRENCY_CODE,
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-multiple-contract-policy', () => {
  let populatedApplicationMultiplePolicy: Application;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    const multiplePolicyApplication = await createFullApplication(context, FIELD_VALUES.POLICY_TYPE.MULTIPLE);

    populatedApplicationMultiplePolicy = await getPopulatedApplication(context, mapApplicationIds(multiplePolicyApplication));
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplicationMultiplePolicy;

    const result = mapMultipleContractPolicy(policy);

    const expected = [
      xlsxRow(String(CONTENT_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
      xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
      xlsxRow(String(CONTENT_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
      xlsxRow(String(CONTENT_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
    ];

    expect(result).toEqual(expected);
  });
});
