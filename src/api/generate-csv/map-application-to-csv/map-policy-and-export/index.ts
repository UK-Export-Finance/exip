import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../constants/field-ids/insurance';
import { GBP_CURRENCY_CODE } from '../../../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../helpers/policy-type';
import csvRow from '../helpers/csv-row';
import formatDate from '../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import { Application } from '../../../types';

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

export const mapSinglePolicyFields = (application: Application) => {
  const { policyAndExport } = application;

  return [
    csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
    csvRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE])),
    csvRow(String(CONTENT_STRINGS.SINGLE[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[CONTRACT_COMPLETION_DATE])),
    csvRow(String(CONTENT_STRINGS.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
  ];
};

export const mapMultiplePolicyFields = (application: Application) => {
  const { policyAndExport } = application;

  return [
    csvRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policyAndExport[TOTAL_MONTHS_OF_COVER])),
    csvRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
    csvRow(String(CONTENT_STRINGS.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), formatCurrency(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
  ];
};

/**
 * mapPolicyAndExport
 * Map an application's policy and export fields into an array of objects for CSV generation
 * @param {Object} Application
 * @returns {Array} Array of objects for CSV generation
 */
const mapPolicyAndExport = (application: Application) => {
  let mapped = [];

  const { policyAndExport } = application;

  mapped = [
    csvRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
    csvRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE])),
  ];

  const policyType = application.policyAndExport[POLICY_TYPE];

  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSinglePolicyFields(application)];
  }

  // TODO: mapMonthString

  if (isMultiPolicyType(policyType)) {
    mapped = [...mapped, ...mapMultiplePolicyFields(application)];
  }
  return mapped;
};

export default mapPolicyAndExport;
