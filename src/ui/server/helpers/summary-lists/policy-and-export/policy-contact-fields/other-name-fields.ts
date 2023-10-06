import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import { ApplicationPolicyContact, SummaryListItemData } from '../../../../../types';
import generateChangeLink from '../../../generate-change-link';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { NAME, POSITION },
  },
} = INSURANCE_FIELD_IDS;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY_AND_EXPORTS: { NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * generateOtherNameFields
 * Create all fields and values for the Insurance - Policy contact - Other name
 * @param {ApplicationPolicyContact} answer - policyContact data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policyContact - other name selected fields and values in an object structure for GOVUK summary list structure
 */
const generateOtherNameFields = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.NAME_ON_POLICY, NAME),
        renderChangeLink: true,
        href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
      },
      `${answers[FIRST_NAME]} ${answers[LAST_NAME]}`,
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.DIFFERENT_NAME_ON_POLICY, EMAIL),
        renderChangeLink: true,
        href: generateChangeLink(
          DIFFERENT_NAME_ON_POLICY_CHANGE,
          DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
          `#${EMAIL}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[EMAIL],
    ),
    fieldGroupItem(
      {
        field: getFieldById(FIELDS.NAME_ON_POLICY, POSITION),
        renderChangeLink: true,
        href: generateChangeLink(
          DIFFERENT_NAME_ON_POLICY_CHANGE,
          DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
          `#${POSITION}-label`,
          referenceNumber,
          checkAndChange,
        ),
      },
      answers[POSITION],
    ),
  ] as Array<SummaryListItemData>;

  return fields;
};

export default generateOtherNameFields;
