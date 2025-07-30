import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { objectHasProperty } from '../../../../../../helpers/object';
import { RequestBody } from '../../../../../../../types';

const {
  FEEDBACK: { IMPROVEMENT: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.FEEDBACK.IMPROVEMENT;

/**
 * validate the IMPROVEMENT field
 * check if answer has been provided and if so, check it is not over a maximum length.
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} errors
 */
const improveService = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, FIELD_ID)) {
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default improveService;
