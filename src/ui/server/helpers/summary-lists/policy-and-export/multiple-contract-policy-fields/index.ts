import { FIELDS } from '../../../../content-strings/fields/insurance';
import FIELD_IDS from '../../../../constants/field-ids/insurance/policy-and-exports';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatCurrency from '../../../format-currency';
import mapMonthString from '../../../data-content-mappings/map-month-string';
import { ApplicationPolicyAndExport, SummaryListItemData } from '../../../../../types';

const {
  CONTRACT_POLICY: {
    MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
  },
} = FIELD_IDS;

/**
 * generateMultipleContractPolicyFields
 * Create all fields and values for the Insurance - Type of policy - single contract policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All Multiple contract policy fields and values in an object structure for GOVUK summary list structure
 */
const generateMultipleContractPolicyFields = (answers: ApplicationPolicyAndExport) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_MONTHS_OF_COVER),
        data: answers,
      },
      mapMonthString(answers[TOTAL_MONTHS_OF_COVER]),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, TOTAL_SALES_TO_BUYER),
        data: answers,
      },
      formatCurrency(answers[TOTAL_SALES_TO_BUYER], 'GBP'),
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.CONTRACT_POLICY.MULTIPLE, MAXIMUM_BUYER_WILL_OWE),
        data: answers,
      },
      formatCurrency(answers[MAXIMUM_BUYER_WILL_OWE], 'GBP'),
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateMultipleContractPolicyFields;
