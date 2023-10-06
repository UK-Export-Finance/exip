import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { ApplicationPolicyContact, SummaryListItemData } from '../../../../../types';
import generateSameNameFields from './same-name-fields';
import generateOtherNameFields from './other-name-fields';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { IS_SAME_AS_OWNER },
  },
} = INSURANCE_FIELD_IDS;

/**
 * generatePolicyContactFields
 * Create all policy and date fields and values for the Insurance - policy contact govukSummaryList
 * @param {Object} All submitted policyContact data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policyContact fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyContactFields = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean) => {
  let fields;

  // if same name as owner, then generate fields for same name, else other name fields
  if (answers[IS_SAME_AS_OWNER]) {
    fields = generateSameNameFields(answers, referenceNumber, checkAndChange) as Array<SummaryListItemData>;
  } else {
    fields = generateOtherNameFields(answers, referenceNumber, checkAndChange) as Array<SummaryListItemData>;
  }

  return fields;
};

export default generatePolicyContactFields;
