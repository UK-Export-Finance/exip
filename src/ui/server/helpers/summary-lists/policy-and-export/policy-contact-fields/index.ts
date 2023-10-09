import INSURANCE_FIELD_IDS from '../../../../constants/field-ids/insurance';
import ACCOUNT_FIELD_IDS from '../../../../constants/field-ids/insurance/account';
import { INSURANCE_ROUTES } from '../../../../constants/routes/insurance';
import { POLICY_AND_EXPORTS_FIELDS as FIELDS } from '../../../../content-strings/fields/insurance';
import { ApplicationPolicyContact, SummaryListItemData } from '../../../../../types';
import fieldGroupItem from '../../generate-field-group-item';
import getFieldById from '../../../get-field-by-id';
import generateChangeLink from '../../../generate-change-link';

const {
  POLICY_AND_EXPORTS: {
    NAME_ON_POLICY: { NAME, POSITION, IS_SAME_AS_OWNER },
  },
} = INSURANCE_FIELD_IDS;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

const {
  POLICY_AND_EXPORTS: { NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

// generates fieldGroupItem for nameOnPolicy
const nameOnPolicyField = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean) =>
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.NAME_ON_POLICY, NAME),
      renderChangeLink: true,
      href: generateChangeLink(NAME_ON_POLICY_CHANGE, NAME_ON_POLICY_CHECK_AND_CHANGE, `#${NAME}-label`, referenceNumber, checkAndChange),
    },
    `${answers[FIRST_NAME]} ${answers[LAST_NAME]}`,
  );

// generates fieldGroupItem for position - changeLink based on sameName
const positionField = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean, sameName: boolean) => {
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

// generates fieldGroupItem for email
const emailField = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean) =>
  fieldGroupItem(
    {
      field: getFieldById(FIELDS.DIFFERENT_NAME_ON_POLICY, EMAIL),
      renderChangeLink: true,
      href: generateChangeLink(DIFFERENT_NAME_ON_POLICY_CHANGE, DIFFERENT_NAME_ON_POLICY_CHECK_AND_CHANGE, `#${EMAIL}-label`, referenceNumber, checkAndChange),
    },
    answers[EMAIL],
  );

/**
 * generatePolicyContactFields
 * Create all policy and date fields and values for the Insurance - policy contact govukSummaryList
 * @param {Object} All submitted policyContact data
 * @param {Boolean} checkAndChange true if coming from check your answers section in submit application section
 * @returns {Object} All policyContact fields and values in an object structure for GOVUK summary list structure
 */
const generatePolicyContactFields = (answers: ApplicationPolicyContact, referenceNumber: number, checkAndChange: boolean) => {
  const fields = [nameOnPolicyField(answers, referenceNumber, checkAndChange)] as Array<SummaryListItemData>;

  // if IS_SAME_AS_OWNER is false, then add email field
  if (!answers[IS_SAME_AS_OWNER]) {
    fields.push(emailField(answers, referenceNumber, checkAndChange));
  }

  fields.push(positionField(answers, referenceNumber, checkAndChange, answers[IS_SAME_AS_OWNER]));

  return fields;
};

export default generatePolicyContactFields;
