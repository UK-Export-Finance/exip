import mapPolicyAndExport from '.';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { GBP_CURRENCY_CODE } from '../../../constants';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import { mockApplication } from '../../../test-mocks';

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
  },
} = FIELD_IDS.POLICY_AND_EXPORTS;

describe('api/generate-csv/map-application-to-csv/map-policy-and-export', () => {
  it('should return an array of mapped buyer fields', () => {
    const result = mapPolicyAndExport(mockApplication);

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
