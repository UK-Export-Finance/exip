import { ERROR_MESSAGES } from '../../../../../../content-strings';
import FIELD_IDS from '../../../../../../constants/field-ids/insurance/policy';
import { RequestBody } from '../../../../../../../types';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';

const {
  BROKER: { TOWN: FIELD_ID, USING_BROKER },
} = FIELD_IDS;

const {
  POLICY: { [FIELD_ID]: ERROR_MESSAGE },
} = ERROR_MESSAGES.INSURANCE;

/**
 * validates broker town field
 * checks if response has been provided
 * @param {RequestBody} formBody
 * @param {object} errors
 * @returns {object} errors
 */
const brokerTown = (formBody: RequestBody, errors: object) => {
  // if USING_BROKER radio is yes then check validation
  if (formBody[USING_BROKER] === true) {
    return emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  return errors;
};

export default brokerTown;
