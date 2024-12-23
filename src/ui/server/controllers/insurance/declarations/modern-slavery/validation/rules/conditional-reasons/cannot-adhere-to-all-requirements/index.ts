import { MAXIMUM_CHARACTERS } from '../../../../../../../../constants';
import DECLARATIONS_FIELD_IDS from '../../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../../content-strings';
import providedAndMaxLength from '../../../../../../../../shared-validation/provided-and-max-length';
import { RequestBody } from '../../../../../../../../../types';

const {
  WILL_ADHERE_TO_ALL_REQUIREMENTS,
  CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID },
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
 * cannotAdhereToAllRequirementsRules
 * @param {Express.Request.body} Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @returns {ValidationErrors} providedAndMaxLength
 */
const cannotAdhereToAllRequirementsRules = (formBody: RequestBody, errors: object) => {
  if (formBody[WILL_ADHERE_TO_ALL_REQUIREMENTS] === 'false') {
    return providedAndMaxLength(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT, errors, MAXIMUM);
  }

  return errors;
};

export default cannotAdhereToAllRequirementsRules;
