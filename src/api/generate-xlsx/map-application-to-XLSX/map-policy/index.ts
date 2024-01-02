import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { POLICY_FIELDS, EXPORT_CONTRACT_FIELDS } from '../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE } from '../../../constants';
import { isSinglePolicyType, isMultiplePolicyType } from '../../../helpers/policy-type';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import { Application } from '../../../types';

const CONTENT_STRINGS = {
  ...POLICY_FIELDS,
  ...POLICY_FIELDS.CONTRACT_POLICY,
  ...POLICY_FIELDS.CONTRACT_POLICY.SINGLE,
  ...POLICY_FIELDS.CONTRACT_POLICY.MULTIPLE,
  ...POLICY_FIELDS.EXPORT_VALUE.SINGLE,
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
    },
    EXPORT_VALUE: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION, FINAL_DESTINATION },
  },
} = FIELD_IDS;

export const mapPolicyIntro = (application: Application) => {
  const { policy } = application;

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.POLICY, ''),
    xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policy[POLICY_TYPE]),
    xlsxRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policy[REQUESTED_START_DATE], 'dd-MMM-yy')),
  ];

  return mapped;
};

export const mapSinglePolicyFields = (application: Application) => {
  const { policy } = application;

  return [
    xlsxRow(String(CONTENT_STRINGS[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policy[CONTRACT_COMPLETION_DATE], 'dd-MMM-yy')),
    xlsxRow(String(CONTENT_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
  ];
};

export const mapMultiplePolicyFields = (application: Application) => {
  const { policy } = application;

  const mapped = [
    xlsxRow(String(CONTENT_STRINGS[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
    xlsxRow(String(CONTENT_STRINGS[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
    xlsxRow(String(CONTENT_STRINGS[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
  ];

  return mapped;
};

export const mapPolicyOutro = (application: Application) => {
  const { exportContract, policy } = application;

  const mapped = [
    xlsxRow(String(CONTENT_STRINGS[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
    xlsxRow(String(CONTENT_STRINGS[DESCRIPTION].SUMMARY?.TITLE), exportContract[DESCRIPTION]),
    xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION].SUMMARY?.TITLE), exportContract[FINAL_DESTINATION].name),
  ];

  return mapped;
};

/**
 * mapPolicy
 * Map an application's policy fields into an array of objects for XLSX generation
 * @param {Application}
 * @returns {Array} Array of objects for XLSX generation
 */
const mapPolicy = (application: Application) => {
  let mapped = mapPolicyIntro(application);

  const policyType = application.policy[POLICY_TYPE];

  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSinglePolicyFields(application)];
  }

  if (isMultiplePolicyType(policyType)) {
    mapped = [...mapped, ...mapMultiplePolicyFields(application)];
  }

  mapped = [...mapped, ...mapPolicyOutro(application)];

  return mapped;
};

export default mapPolicy;
