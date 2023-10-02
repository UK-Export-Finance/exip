import { RequestBody, Application } from '../../../../../../types';
import POLICY_AND_EXPORTS_FIELD_IDS from '../../../../../constants/field-ids/insurance/policy-and-exports';
import ACCOUNT_FIELD_IDS from '../../../../../constants/field-ids/insurance/account';

const {
  NAME_ON_POLICY: { NAME, POSITION, SAME_NAME, OTHER_NAME, IS_SAME_AS_OWNER },
} = POLICY_AND_EXPORTS_FIELD_IDS;

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
   * if NAME set to OTHER_NAME
   * remove NAME
   * if POSITION populated, then should be set to empty string to send to API
   */
  if (populatedData[NAME] === OTHER_NAME) {
    populatedData[IS_SAME_AS_OWNER] = false;

    delete populatedData[NAME];

    if (populatedData[POSITION]) {
      populatedData[POSITION] = '';
    }
  }

  if (populatedData[NAME] === '') {
    delete populatedData[NAME];
  }

  return populatedData;
};

export default mapSubmittedData;
