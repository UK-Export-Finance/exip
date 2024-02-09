import POLICY_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';
import hasPolicyContactChanged from '../../../../../helpers/has-policy-contact-changed';
import isPolicyContactDataSameAsOwner from '../../../../../helpers/is-policy-contact-data-same-as-owner';
import { RequestBody, Application, ApplicationPolicyContact } from '../../../../../../types';

const {
  NAME_ON_POLICY: { NAME, POSITION, SAME_NAME, OTHER_NAME, IS_SAME_AS_OWNER },
} = POLICY_FIELD_IDS;

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * mapSubmittedData policyContact
 * Check form data and map any fields that need to be sent to the API/DB in a different format or structure.
 * if SAME_NAME selected, then populated populatedData with owner details
 * NAME field removed as not sent to API
 * If OTHER_NAME and POSITION is populated, then should be set to empty string
 * @param {Express.Request.body} formBody
 * @param {Application} application
 * @returns {Object} Page variables
 */
const mapSubmittedData = (formBody: RequestBody, application: Application): object => {
  const populatedData = formBody;
  const samePolicyContact = isPolicyContactDataSameAsOwner(application.owner, formBody as ApplicationPolicyContact);

  /**
   * if SAME_NAME, then populate fields from application owner
   * NAME removed as not sent to API
   */
  if (populatedData[NAME] === SAME_NAME) {
    populatedData[IS_SAME_AS_OWNER] = true;

    const { owner } = application;

    populatedData[FIRST_NAME] = owner[FIRST_NAME];
    populatedData[LAST_NAME] = owner[LAST_NAME];
    populatedData[EMAIL] = owner[EMAIL];

    delete populatedData[NAME];
  }

  /**
   * If NAME is set to OTHER_NAME:
   * - Set IS_SAME_AS_OWNER to false
   * - Remove NAME
   * If the policy contact has changed and is now the application owner,
   * nullify policy contact values.
   */
  if (populatedData[NAME] === OTHER_NAME) {
    populatedData[IS_SAME_AS_OWNER] = false;

    delete populatedData[NAME];

    const policyContactChanged = hasPolicyContactChanged(application.policyContact, formBody as ApplicationPolicyContact);

    if (policyContactChanged && !samePolicyContact) {
      populatedData[POSITION] = '';
      populatedData[FIRST_NAME] = '';
      populatedData[LAST_NAME] = '';
      populatedData[EMAIL] = '';
    }
  }

  /**
   * If NAME is an empty string,
   * Delete the field.
   */
  if (populatedData[NAME] === '') {
    delete populatedData[NAME];
  }

  /**
   * If the policy contact is the same as the application owner,
   * Set IS_SAME_AS_OWNER to true.
   */
  if (samePolicyContact) {
    populatedData[IS_SAME_AS_OWNER] = true;
  }

  return populatedData;
};

export default mapSubmittedData;
