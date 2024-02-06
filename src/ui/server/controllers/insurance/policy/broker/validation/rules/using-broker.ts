import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { USING_BROKER: FIELD_ID },
} = FIELD_IDS;

const {
  POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates using broker field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {object} errors
 * @returns {object} errors
 */
const isUsingBrokerRules = (formBody: RequestBody, errors: object) => {
  /**
   * Answer is allowed to be false
   * Since this is a yes/no question
   */
  if (formBody[FIELD_ID] === false) {
    return errors;
  }

  return emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
};

export default isUsingBrokerRules;
