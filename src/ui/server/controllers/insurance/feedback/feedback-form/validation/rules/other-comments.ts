import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, MAXIMUM_CHARACTERS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { objectHasProperty } from '../../../../../../helpers/object';

const {
  FEEDBACK: { OTHER_COMMENTS: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

const MAXIMUM = MAXIMUM_CHARACTERS.FEEDBACK.OTHER_COMMENTS;

/**
 * validates other comments field
 * checks if answer has been provided
 * @param {RequestBody} formBody
 * @param {object} errors: Other validation errors for the same form
 * @returns {object} errors
 */
const otherComments = (formBody: RequestBody, errors: object) => {
  if (objectHasProperty(formBody, FIELD_ID)) {
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default otherComments;
