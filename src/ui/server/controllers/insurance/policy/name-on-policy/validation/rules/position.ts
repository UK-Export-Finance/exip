import INSURANCE_FIELD_IDS from '../../../../../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { POLICY_FIELDS } from '../../../../../../content-strings/fields/insurance/policy';
import alphaCharactersAndMaxLengthValidation from '../../../../../../shared-validation/alpha-characters-and-max-length';
import { RequestBody } from '../../../../../../../types';

const {
  POLICY: {
    NAME_ON_POLICY: { POSITION: FIELD_ID, NAME, SAME_NAME },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

const { NAME_ON_POLICY } = POLICY_FIELDS;

const MAXIMUM = Number(NAME_ON_POLICY[FIELD_ID].MAXIMUM);

/**
 * positionRule
 * Returns the result of emptyFieldValidation if SAME_NAME is selected
 * else returns provided errors object
 * @param {RequestBody} formBody: Form body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const positionRule = (formBody: RequestBody, errors: object) => {
  if (formBody[NAME] === SAME_NAME) {
    return alphaCharactersAndMaxLengthValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);
  }

  return errors;
};

export default positionRule;
