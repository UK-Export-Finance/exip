import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  DIFFERENT_NAME_ON_POLICY: { POSITION: FIELD_ID },
} = FIELD_IDS;

const {
  DIFFERENT_NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
} = ERROR_MESSAGES.INSURANCE.POLICY;

const { DIFFERENT_NAME_ON_POLICY } = POLICY_FIELDS;

export const MAXIMUM = Number(DIFFERENT_NAME_ON_POLICY[FIELD_ID].MAXIMUM);

/**
 * validates position field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors: Other validation errors for the same form
 * @returns {Object} errors
 */
const position = (formBody: RequestBody, errors: object) => alphaCharactersAndMaxLengthValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);

export default position;
