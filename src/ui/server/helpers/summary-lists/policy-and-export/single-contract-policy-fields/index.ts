import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { GBP_CURRENCY_CODE } from '../../../../constants';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy-and-exports';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import formatCurrency from '../../../format-currency';
import { ApplicationPolicyAndExport, SummaryListItemData } from '../../../../../types';

const {
  CONTRACT_POLICY: {
    SINGLE: { CONTRACT_COMPLETION_DATE, TOTAL_CONTRACT_VALUE },
  },
} = FIELD_IDS;

/**
 * generateSingleContractPolicyFields
 * Create all fields and values for the Insurance - Type of policy - single contract policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All Multiple contract policy fields and values in an object structure for GOVUK summary list structure
 */
const generateSingleContractPolicyFields = (answers: ApplicationPolicyAndExport) => {
  const fields = [
    fieldGroupItem(
      { field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, TOTAL_CONTRACT_VALUE) },
      formatCurrency(answers[TOTAL_CONTRACT_VALUE], GBP_CURRENCY_CODE),
    ),
    fieldGroupItem({ field: getFieldById(FIELDS.CONTRACT_POLICY.SINGLE, CONTRACT_COMPLETION_DATE) }, formatDate(answers[CONTRACT_COMPLETION_DATE])),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateSingleContractPolicyFields;
