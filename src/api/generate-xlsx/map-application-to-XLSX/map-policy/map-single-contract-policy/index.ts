import { GBP_CURRENCY_CODE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance';
import { XLSX } from '../../../../content-strings';
import { POLICY_FIELDS } from '../../../../content-strings/fields/insurance';
import xlsxRow from '../../helpers/xlsx-row';
import formatDate from '../../../../helpers/format-date';
import formatCurrency from '../../helpers/format-currency';
import { ApplicationPolicy } from '../../../../types';

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

/**
 * mapSingleContractPolicy
 * Map an application's single contract policy fields into an array of objects for XLSX generation
 * @param {ApplicationPolicy} policy
 * @returns {Array<object>} Array of objects for XLSX generation
 */
const mapSingleContractPolicy = (policy: ApplicationPolicy) => {
  const mapped = [
    xlsxRow(String(FIELDS[CONTRACT_COMPLETION_DATE]), formatDate(policy[CONTRACT_COMPLETION_DATE], 'dd MM yyyy')),
    xlsxRow(String(CONTENT_STRINGS[CURRENCY_CODE].SUMMARY?.TITLE), policy[POLICY_CURRENCY_CODE]),
    xlsxRow(String(CONTENT_STRINGS[TOTAL_CONTRACT_VALUE].SUMMARY?.TITLE), formatCurrency(policy[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE)),
  ];

  return mapped;
};

export default mapSingleContractPolicy;
