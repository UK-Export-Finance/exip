import { endOfDay, isFuture, isValid } from 'date-fns';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
import { objectHasProperty } from '../../helpers/object';
import createTimestampFromNumbers from '../../helpers/date/create-timestamp-from-numbers';
import { isNumber } from '../../helpers/number';
import { RequestBody } from '../../../types';

const {
  POLICY: {
    CONTRACT_POLICY: { REQUESTED_START_DATE: FIELD_ID },
  },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: {
    POLICY: {
      CONTRACT_POLICY: { [FIELD_ID]: ERROR_MESSAGE },
    },
  },
} = ERROR_MESSAGES;

/**
 * requestedStartDateRules
 * Check submitted form data for errors with the requested start date field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} Express response body
 * @param {Object} Errors object from previous validation errors
 * @returns {Object} Validation errors
 */
const requestedStartDateRules = (formBody: RequestBody, errors: object) => {
  const dayId = `${FIELD_ID}-day`;
  const monthId = `${FIELD_ID}-month`;
  const yearId = `${FIELD_ID}-year`;

  // check that no fields are empty.
  if (!objectHasProperty(formBody, dayId) || !objectHasProperty(formBody, monthId) || !objectHasProperty(formBody, yearId)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  const day = formBody[dayId];
  const month = formBody[monthId];
  const year = formBody[yearId];

  // check that all fields are numbers.
  if (!isNumber(day) || !isNumber(month) || !isNumber(year)) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.NOT_A_NUMBER, errors);
  }

  const submittedDate = createTimestampFromNumbers(Number(day), Number(month), Number(year));

  if (submittedDate) {
    // check that the date is valid e.g not a month value of 24.
    if (!isValid(submittedDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
    }

    // check that the date is in the future.
    if (!isFuture(endOfDay(submittedDate))) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BEFORE_EARLIEST, errors);
    }
  }

  return errors;
};

export default requestedStartDateRules;
