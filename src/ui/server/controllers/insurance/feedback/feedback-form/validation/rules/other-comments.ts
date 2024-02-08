import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS } from '../../../../../../constants';
import { RequestBody } from '../../../../../../../types';
import maxLengthValidation from '../../../../../../shared-validation/max-length';
import { objectHasProperty } from '../../../../../../helpers/object';

const {
  FEEDBACK: { OTHER_COMMENTS: FIELD_ID },
} = FIELD_IDS;

const { [FIELD_ID]: ERROR_MESSAGE } = ERROR_MESSAGES;

export const MAXIMUM = 1200;

/**
 * validates other comments field
 * checks if answer has been provided
 * @param {RequestBody} formBody
 * @param {Object} errors
 * @returns {Object} errors
 */
const otherComments = (formBody: RequestBody, errors: object) => {
  // if field has a value
  if (objectHasProperty(formBody, FIELD_ID)) {
    // checks field is not over maximum characters
    return maxLengthValidation(formBody[FIELD_ID], FIELD_ID, ERROR_MESSAGE, errors, MAXIMUM);
  }

  return errors;
};

export default otherComments;
