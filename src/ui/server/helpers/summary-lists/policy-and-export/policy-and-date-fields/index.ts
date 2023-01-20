import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { FIELD_IDS } from '../../../../constants';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import formatDate from '../../../date/format-date';
import { ApplicationPolicyAndExport, SummaryListItemData } from '../../../../../types';

const {
  INSURANCE: {
    POLICY_AND_EXPORTS: {
      TYPE_OF_POLICY: { POLICY_TYPE },
      CONTRACT_POLICY: { REQUESTED_START_DATE },
    },
  },
} = FIELD_IDS;

/**
 * generatePolicyAndDateFields
 * Create all policy and date fields and values for the Insurance - Type of policy govukSummaryList
 * @param {Object} All submitted policy and export data
 * @returns {Object} All policy and date fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyAndDateFields = (answers: ApplicationPolicyAndExport) => {
  const fields = [
    fieldGroupItem({
      field: getFieldById(FIELDS, POLICY_TYPE),
      data: answers,
    }),
    fieldGroupItem({ field: getFieldById(FIELDS.CONTRACT_POLICY, REQUESTED_START_DATE) }, formatDate(answers[REQUESTED_START_DATE])),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generatePolicyAndDateFields;
