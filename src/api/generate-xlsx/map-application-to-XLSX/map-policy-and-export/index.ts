import FIELD_IDS from '../../../constants/field-ids/insurance';
import { XLSX } from '../../../content-strings';
import { POLICY_AND_EXPORTS_FIELDS } from '../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE } from '../../../constants';
import { isSinglePolicyType, isMultiPolicyType } from '../../../helpers/policy-type';
import xlsxRow from '../helpers/xlsx-row';
import formatDate from '../../../helpers/format-date';
import formatCurrency from '../helpers/format-currency';
import mapMonthString from '../helpers/map-month-string';
import { Application } from '../../../types';

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

export const mapPolicyAndExportIntro = (application: Application) => {
  const { policyAndExport } = application;

  const mapped = [
    xlsxRow(XLSX.SECTION_TITLES.POLICY_AND_EXPORT, ''),
    xlsxRow(String(CONTENT_STRINGS[POLICY_TYPE].SUMMARY?.TITLE), policyAndExport[POLICY_TYPE]),
    xlsxRow(String(CONTENT_STRINGS[REQUESTED_START_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[REQUESTED_START_DATE], 'dd-MMM-yy')),
  ];

  return mapped;
};

export const mapSinglePolicyFields = (application: Application) => {
  const { policyAndExport } = application;

  return [
    xlsxRow(String(CONTENT_STRINGS.SINGLE[CONTRACT_COMPLETION_DATE].SUMMARY?.TITLE), formatDate(policyAndExport[CONTRACT_COMPLETION_DATE], 'dd-MMM-yy')),
    xlsxRow(String(CONTENT_STRINGS.SINGLE[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
  ];
};

export const mapMultiplePolicyFields = (application: Application) => {
  const { policyAndExport } = application;

  return [
    xlsxRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_MONTHS_OF_COVER].SUMMARY?.TITLE), mapMonthString(policyAndExport[TOTAL_MONTHS_OF_COVER])),
    xlsxRow(String(CONTENT_STRINGS.MULTIPLE[TOTAL_SALES_TO_BUYER].SUMMARY?.TITLE), formatCurrency(policyAndExport[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
    xlsxRow(
      String(CONTENT_STRINGS.MULTIPLE[MAXIMUM_BUYER_WILL_OWE].SUMMARY?.TITLE),
      formatCurrency(policyAndExport[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE),
    ),
  ];
};

export const mapPolicyAndExportOutro = (application: Application) => {
  const { policyAndExport } = application;

  const mapped = [
    xlsxRow(String(CONTENT_STRINGS[CREDIT_PERIOD_WITH_BUYER].SUMMARY?.TITLE), policyAndExport[CREDIT_PERIOD_WITH_BUYER]),
    xlsxRow(String(CONTENT_STRINGS[POLICY_CURRENCY_CODE].SUMMARY?.TITLE), policyAndExport[POLICY_CURRENCY_CODE]),
    xlsxRow(String(CONTENT_STRINGS[DESCRIPTION].SUMMARY?.TITLE), policyAndExport[DESCRIPTION]),
    xlsxRow(String(CONTENT_STRINGS[FINAL_DESTINATION].SUMMARY?.TITLE), policyAndExport[FINAL_DESTINATION].name),
  ];

  return mapped;
};

/**
 * mapPolicyAndExport
 * Map an application's policy and export fields into an array of objects for XLSX generation
 * @param {Object} Application
 * @returns {Array} Array of objects for XLSX generation
 */
const mapPolicyAndExport = (application: Application) => {
  let mapped = mapPolicyAndExportIntro(application);

  const policyType = application.policyAndExport[POLICY_TYPE];

  if (isSinglePolicyType(policyType)) {
    mapped = [...mapped, ...mapSinglePolicyFields(application)];
  }

  if (isMultiPolicyType(policyType)) {
    mapped = [...mapped, ...mapMultiplePolicyFields(application)];
  }

  mapped = [...mapped, ...mapPolicyAndExportOutro(application)];

  return mapped;
};

export default mapPolicyAndExport;
