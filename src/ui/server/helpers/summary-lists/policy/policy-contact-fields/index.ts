import { FORM_TITLES } from '../../../../content-strings/form-titles';
import { POLICY as POLICY_FIELD_IDS } from '../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { ApplicationPolicyContact, SummaryListItemData } from '../../../../../types';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';

const {
  POLICY: { NAME_ON_POLICY: FORM_TITLE },
} = FORM_TITLES;

const {
  NAME_ON_POLICY: { NAME, POSITION, IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY: { NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

/**
 * nameOnPolicyField
 * returns fieldGroupItem for summary list for nameOnPolicy
 * @param {ApplicationPolicyContact} answers: submitted policyContact data
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} fieldGroupItem for name on policy
 */
const nameOnPolicyField = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange?: boolean) =>
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.NAME_ON_POLICY, NAME),
      renderChangeLink: true,
      href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
    },
    `${answers[FIRST_NAME]} ${answers[LAST_NAME]}`,
  );

/**
 * positionField
 * returns fieldGroupItem for summary list for position
 * generates changeLink to name on policy page or different name on policy page based on if sameName is true or not
 * @param {ApplicationPolicyContact} answers: submitted policyContact data
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} sameName: if IS_SAME_AS_OWNER is true
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} fieldGroupItem for position
 */
const positionField = (answers: ApplicationPolicyContact, referenceNumber: number, sameName: boolean, checkAndChange?: boolean) => {
  let changeLink = generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${POSITION}-label`, referenceNumber, checkAndChange);

  if (!sameName) {
    changeLink = generateChangeLink(
      DIFFERENT_NAME_ON_POLICY_CHANGE,
      DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE,
      `#${POSITION}-label`,
      referenceNumber,
      checkAndChange,
    );
  }

  return fieldGroupItem(
    {
      field: getFieldById(FIELDS.NAME_ON_POLICY, POSITION),
      renderChangeLink: true,
      href: changeLink,
    },
    answers[POSITION],
  );
};

/**
 * emailField
 * returns fieldGroupItem for summary list for email
 * @param {ApplicationPolicyContact} answers: submitted policyContact data
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @param {boolean} shouldRenderChangeLink: if renders change link - provided by answer to IS_SAME_AS_OWNER - if IS_SAME_AS_OWNER - no change link
 * @returns {object} fieldGroupItem for name on email
 */
const emailField = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange?: boolean, shouldRenderChangeLink?: boolean) =>
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.DIFFERENT_NAME_ON_POLICY, EMAIL),
      renderChangeLink: shouldRenderChangeLink,
      href: generateChangeLink(DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
    },
    answers[EMAIL],
  );

/**
 * generatePolicyContactFields
 * Create all policy fields and values for the Insurance - policy contact govukSummaryList
 * @param {object} answers: All submitted policyContact data
 * @param {number} referenceNumber: Application reference number
 * @param {boolean} checkAndChange: True if coming from check your answers section in submit application section
 * @returns {object} All policyContact fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyContactFields = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange?: boolean) => {
  const fields = [nameOnPolicyField(answers, referenceNumber, checkAndChange)] as Array<SummaryListItemData>;

  /**
   * if answers[IS_SAME_AS_OWNER], then change link should not be rendered so inverse passed
   */
  fields.push(emailField(answers, referenceNumber, checkAndChange, !answers[IS_SAME_AS_OWNER]));

  fields.push(positionField(answers, referenceNumber, Boolean(answers[IS_SAME_AS_OWNER]), checkAndChange));

  return {
    title: FORM_TITLE,
    fields,
  };
};

export default generatePolicyContactFields;
