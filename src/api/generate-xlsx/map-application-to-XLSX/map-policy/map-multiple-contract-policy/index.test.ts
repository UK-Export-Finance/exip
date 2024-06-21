import mapMultipleContractPolicy from '.';
import { FIELD_VALUES } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import mapMonthString from '../../helpers/map-month-string';
import formatCurrency from '../../helpers/format-currency';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../../test-helpers';
import { Application, Context } from '../../../../types';

const { FIELDS } = XLSX;

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

    populatedApplicationMultiplePolicy = await getPopulatedApplication.get({ context, application: mapApplicationIds(multiplePolicyApplication) });
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplicationMultiplePolicy;

    const result = mapMultipleContractPolicy(policy);

    const expected = [
      xlsxRow(String(FIELDS[TOTAL_MONTHS_OF_COVER]), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
      xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
      xlsxRow(String(FIELDS[TOTAL_SALES_TO_BUYER]), formatCurrency(policy[TOTAL_SALES_TO_BUYER], policy[POLICY_CURRENCY_CODE])),
      xlsxRow(String(FIELDS[MAXIMUM_BUYER_WILL_OWE]), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], policy[POLICY_CURRENCY_CODE])),
    ];

    expect(result).toEqual(expected);
  });
});
