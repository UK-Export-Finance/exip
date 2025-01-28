import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../../types';

const {
  IS_NOT_AWARE_OF_EXISTING_SLAVERY,
  CONDITIONAL_REASONS: { AWARE_OF_EXISTING_SLAVERY: FIELD_ID },
} = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: {
        CONDITIONAL_REASONS: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
      },
    },
  },
} = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.DECLARATIONS.MODERN_SLAVERY.CONDITIONAL_REASON;

/**
 * awareOfExistingSlaveryRules
 * @param {Express.Request.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const awareOfExistingSlaveryRules = (formBody: RequestBody, errors: object) => {
  if (formBody[IS_NOT_AWARE_OF_EXISTING_SLAVERY] === 'false') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);
  }

  return errors;
};

export default awareOfExistingSlaveryRules;
