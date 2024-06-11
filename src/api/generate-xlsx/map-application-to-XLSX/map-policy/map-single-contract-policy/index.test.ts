import mapSingleContractPolicy from '.';
import { GBP_CURRENCY_CODE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import formatDate from '../../../../helpers/format-date';
import formatCurrency from '../../helpers/format-currency';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { createFullApplication, getKeystoneContext, mapApplicationIds } from '../../../../test-helpers';
import { Application, Context } from '../../../../types';

const { FIELDS } = XLSX;

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
};

const {
  CURRENCY: { CURRENCY_CODE },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { CONTRACT_COMPLETION_DATE },
      POLICY_CURRENCY_CODE,
      SINGLE: { TOTAL_CONTRACT_VALUE },
    },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-single-contract-policy', () => {
  let populatedApplication: Application;
  let application: Application;
  let applicationIds: object;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    application = await createFullApplication(context);

    applicationIds = mapApplicationIds(application);

    populatedApplication = await getPopulatedApplication(context, applicationIds);
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplication;

    const result = mapSingleContractPolicy(policy);

    const expected = [
      xlsxRow(String(FIELDS[CONTRACT_COMPLETION_DATE]), formatDate(policy[CONTRACT_COMPLETION_DATE], 'dd MM yyyy')),
      xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
      xlsxRow(String(CONTENT_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
    ];

    expect(result).toEqual(expected);
  });
});
