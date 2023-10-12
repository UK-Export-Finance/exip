import { ApplicationPolicyContact, ApplicationOwner } from '../../../types';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import { isPopulatedString } from '../string';

const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * stringsAreDefined
 * checks that strings are not null or undefined and greater length than 0
 * @param {String} ownerString - string for firstName, lastName or email
 * @param {String} policyContactString - string for firstName, lastName or email
 * @returns {Boolean}
 */
const stringsAreDefined = (ownerString: string, policyContactString: string) => isPopulatedString(ownerString) && isPopulatedString(policyContactString);

/**
 * stringsAreEqual
 * checks that strings are the same
 * @param {String} ownerString - string for firstName, lastName or email
 * @param {String} policyContactString - string for firstName, lastName or email
 * @returns {Boolean}
 */
const stringsAreEqual = (ownerString: string, policyContactString: string) => ownerString === policyContactString;

/**
 * isPolicyContactDataSameAsOwner
 * checks if policyContact data for names and email is same as application owner
 * returns true if all are the same
 * @param {ApplicationOwner} owner - application owner
 * @param {ApplicationPolicyContact} policyContact - policyContact
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
