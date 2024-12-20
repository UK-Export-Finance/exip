import mapSingleContractPolicy from '.';
import { DATE_FORMAT } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import formatDate from '../../../../helpers/format-date';
import formatCurrency from '../../helpers/format-currency';
import getPopulatedApplication from '../../../../helpers/get-populated-application';
import { getKeystoneContext, generateSubmittedApplication } from '../../../../test-helpers';
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
      SINGLE: { REQUESTED_CREDIT_LIMIT, TOTAL_CONTRACT_VALUE },
    },
  },
} = FIELD_IDS;

describe('api/generate-xlsx/map-application-to-xlsx/map-policy/map-single-contract-policy', () => {
  let populatedApplication: Application;
  let context: Context;

  beforeAll(async () => {
    context = getKeystoneContext();

    const submittedApplication = await generateSubmittedApplication();

    populatedApplication = await getPopulatedApplication.get({ context, application: submittedApplication });
  });

  it('should return an array of mapped fields', () => {
    const { policy } = populatedApplication;

    const result = mapSingleContractPolicy(policy);

    const expected = [
      xlsxRow(String(FIELDS[CONTRACT_COMPLETION_DATE]), formatDate(policy[CONTRACT_COMPLETION_DATE], DATE_FORMAT.XLSX)),
      xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
      xlsxRow(String(FIELDS[TOTAL_CONTRACT_VALUE]), formatCurrency(policy[TOTAL_CONTRACT_VALUE], policy[POLICY_CURRENCY_CODE])),
      xlsxRow(String(CONTENT_STRINGS[REQUESTED_CREDIT_LIMIT].SUMMARY?.TITLE), formatCurrency(policy[REQUESTED_CREDIT_LIMIT], policy[POLICY_CURRENCY_CODE])),
    ];

    expect(result).toEqual(expected);
  });
});
