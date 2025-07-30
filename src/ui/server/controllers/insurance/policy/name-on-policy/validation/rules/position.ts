import { MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { POLICY as POLICY_FIELD_IDS } from '../../../../../../constants/field-ids/insurance/policy';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import nameValidation from '../../../../../../shared-validation/name';
import { RequestBody } from '../../../../../../../types';

const {
  NAME_ON_POLICY: { POSITION: FIELD_ID, NAME, SAME_NAME },
} = POLICY_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      NAME_ON_POLICY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.NAME_ON_POLICY_POSITION;

/**
 * positionRule
 * Returns the result of emptyFieldValidation if SAME_NAME is selected
 * else returns provided errors object
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const positionRule = (formBody: RequestBody, errors: object) => {
  if (formBody[NAME] === SAME_NAME) {
    return nameValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);
  }

  return errors;
};

export default positionRule;
