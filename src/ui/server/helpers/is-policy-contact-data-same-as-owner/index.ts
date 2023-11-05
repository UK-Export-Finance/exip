import { ApplicationPolicyContact, ApplicationOwner } from '../../../types';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { stringsAreDefined, stringsAreEqual } from '../string';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * isPolicyContactDataSameAsOwner
 * checks if policyContact data for names and email is same as application owner
 * returns true if all are the same
 * @param {ApplicationOwner} owner - application owner
 * @param {ApplicationPolicyContact} policyContact
 * @returns {Boolean}
 */
const isPolicyContactDataSameAsOwner = (owner: ApplicationOwner, policyContact: ApplicationPolicyContact) => {
  let sameFirstName = false;
  let sameLastName = false;
  let sameEmail = false;

  // if strings are defined and equal, then change to true
  if (stringsAreDefined(owner[FIRST_NAME], policyContact[FIRST_NAME])) {
    sameFirstName = stringsAreEqual(owner[FIRST_NAME], policyContact[FIRST_NAME]);
  }

  if (stringsAreDefined(owner[LAST_NAME], policyContact[LAST_NAME])) {
    sameLastName = stringsAreEqual(owner[LAST_NAME], policyContact[LAST_NAME]);
  }

  if (stringsAreDefined(owner[EMAIL], policyContact[EMAIL])) {
    sameEmail = stringsAreEqual(owner[EMAIL], policyContact[EMAIL]);
  }

  return sameFirstName && sameLastName && sameEmail;
};

export default isPolicyContactDataSameAsOwner;
