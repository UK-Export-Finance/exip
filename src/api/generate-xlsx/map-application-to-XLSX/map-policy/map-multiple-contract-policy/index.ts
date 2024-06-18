import { GBP_CURRENCY_CODE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import mapMonthString from '../../helpers/map-month-string';
import formatCurrency from '../../helpers/format-currency';
import { ApplicationPolicy } from '../../../../types';

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

/**
 * mapMultipleContractPolicy
 * Map an application's multiple contract policy fields into an array of objects for XLSX generation
 * @param {ApplicationPolicy} policy
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapMultipleContractPolicy = (policy: ApplicationPolicy) => [
  xlsxRow(String(FIELDS[TOTAL_MONTHS_OF_COVER]), mapMonthString(policy[TOTAL_MONTHS_OF_COVER])),
  xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
  xlsxRow(String(FIELDS[TOTAL_SALES_TO_BUYER]), formatCurrency(policy[TOTAL_SALES_TO_BUYER], GBP_CURRENCY_CODE)),
  xlsxRow(String(FIELDS[MAXIMUM_BUYER_WILL_OWE]), formatCurrency(policy[MAXIMUM_BUYER_WILL_OWE], GBP_CURRENCY_CODE)),
];

export default mapMultipleContractPolicy;
