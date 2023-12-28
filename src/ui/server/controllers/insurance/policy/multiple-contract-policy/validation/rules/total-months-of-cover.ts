import { APPLICATION, FIELD_IDS } from '../../../../../../constants';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { objectHasProperty } from '../../../../../../helpers/object';
import emptyFieldValidation from '../../../../../../shared-validation/empty-field';
import { isNumber } from '../../../../../../helpers/number';
import generateValidationErrors from '../../../../../../helpers/validation';
import { RequestBody } from '../../../../../../../types';

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { TOTAL_MONTHS_OF_COVER: FIELD_ID },
      },
    },
  },
} = FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: {
        MULTIPLE: { [FIELD_ID]: ERROR_MESSAGE },
      },
    },
  },
} = ERROR_MESSAGES;

const MINIMUM = 1;
export const MAXIMUM = APPLICATION.POLICY.TOTAL_MONTHS_OF_COVER;

/**
 * totalMonthsOfCoverRules
 * Returns the result of emptyFieldValidation
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const totalMonthsOfCoverRules = (formBody: RequestBody, errors: object) => {
  if (!objectHasProperty(formBody, FIELD_ID)) {
    return emptyFieldValidation(formBody, FIELD_ID, ERROR_MESSAGE.IS_EMPTY, errors);
  }

  if (!isNumber(formBody[FIELD_ID])) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  const monthsOfCover = Number(formBody[FIELD_ID]);

  if (monthsOfCover < MINIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BELOW_MINIMUM, errors);
  }

  if (monthsOfCover > MAXIMUM) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.ABOVE_MAXIMUM, errors);
  }

  return errors;
};

export default totalMonthsOfCoverRules;
