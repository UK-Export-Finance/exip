import { ApplicationOwner, ApplicationPolicyContact } from '../../../types';
import replaceCharacterCodesWithCharacters from '../replace-character-codes-with-characters';
import ACCOUNT_FIELD_IDS from '../../constants/field-ids/insurance/account';
import POLICY_AND_EXPORTS_FIELD_IDS from '../../constants/field-ids/insurance/policy-and-exports';

const {
  NAME_ON_POLICY: { NAME, IS_SAME_AS_OWNER, SAME_NAME, OTHER_NAME },
  DIFFERENT_NAME_ON_POLICY: { POSITION },
} = POLICY_AND_EXPORTS_FIELD_IDS;
const { FIRST_NAME, LAST_NAME, EMAIL } = ACCOUNT_FIELD_IDS;

/**
 * getNameEmailPositionFromOwnerAndPolicy
 * constructs object with name string, position and name value based on owner and policyContact provided
 * constructs SAME_NAME string using firstName, lastName and email for radio display
 * adds value to NAME field for showing if radio is selected
 * @param {ApplicationOwner} owner
 * @param {ApplicationPolicyContact} policyContact
 * @returns {object}
 */
const getNameEmailPositionFromOwnerAndPolicy = (owner: ApplicationOwner, policyContact: ApplicationPolicyContact) => {
  const firstName = replaceCharacterCodesWithCharacters(owner[FIRST_NAME]);
  const lastName = replaceCharacterCodesWithCharacters(owner[LAST_NAME]);
  const email = owner[EMAIL];
  const position = replaceCharacterCodesWithCharacters(policyContact[POSITION]);

  let nameOnPolicy;

  // if IS_SAME_AS_OWNER is set to true, then SAME_NAME so radio can be checked
  if (policyContact[IS_SAME_AS_OWNER] === true) {
    nameOnPolicy = SAME_NAME;
  }

  if (policyContact[IS_SAME_AS_OWNER] === false) {
    nameOnPolicy = OTHER_NAME;
  }

  return {
    [SAME_NAME]: `${firstName} ${lastName} (${email})`,
    [POSITION]: position,
    [NAME]: nameOnPolicy,
  };
};

export default getNameEmailPositionFromOwnerAndPolicy;
