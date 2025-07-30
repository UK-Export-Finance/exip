import DECLARATIONS_FIELD_IDS from '../../../../../../../constants/field-ids/insurance/declarations';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import emptyFieldValidation from '../../../../../../../shared-validation/empty-field';
import { RequestBody } from '../../../../../../../../types';

const { WILL_ADHERE_TO_ALL_REQUIREMENTS: FIELD_ID } = DECLARATIONS_FIELD_IDS.MODERN_SLAVERY;

const {
  INSURANCE: {
    DECLARATIONS: {
      MODERN_SLAVERY: { [FIELD_ID]: ERROR_MESSAGES_OBJECT },
    },
  },
} = ERROR_MESSAGES;

/**
 * willAdhereToAllRequirementsRule
 * Returns the result of emptyFieldValidation
 * else returns provided errors object
 * @param {RequestBody} formBody: Form body
 * @param {object} errors: Errors from previous validation errors
 * @returns {ValidationErrors}
 */
const willAdhereToAllRequirementsRule = (formBody: RequestBody, errors: object) =>
  emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGES_OBJECT.IS_EMPTY, errors);

export default willAdhereToAllRequirementsRule;
