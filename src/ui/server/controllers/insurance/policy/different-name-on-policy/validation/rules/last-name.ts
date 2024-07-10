import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/account';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { RequestBody } from '../../../../../../../types';

const { LAST_NAME: FIELD_ID } = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

/**
 * validates last name field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} alphaCharactersAndMaxLengthValidation
 */
const lastName = (formBody: RequestBody, errors: object) =>
  alphaCharactersAndMaxLengthValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM_CHARACTERS.POLICY_CONTACT_NAME);

export default lastName;
