import { endOfDay, isFuture, isValid } from 'date-fns';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import { ERROR_MESSAGES } from '../../content-strings';
import generateValidationErrors from '../../helpers/validation';
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

  const dayString = formBody[dayId];
  const monthString = formBody[monthId];
  const yearString = formBody[yearId];

  if (!dayString && !monthString && !yearString) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  const day = isNumber(dayString);
  const month = isNumber(monthString);
  const year = isNumber(yearString);

  /**
   * All fields must be numbers.
   */
  if (!day && !month && !year) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INCORRECT_FORMAT, errors);
  }

  /**
   * has a day,
   * no month or year.
   */
  if (day && !month && !year) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.MISSING_MONTH_AND_YEAR, errors);
  }

  /**
   * has a month,
   * no day or year.
   */
  if (!day && month && !year) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.MISSING_DAY_AND_YEAR, errors);
  }

  /**
   * has a year,
   * no day or month.
   */
  if (!day && !month && year) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.MISSING_DAY_AND_MONTH, errors);
  }

  /**
   * Individual date field validation rules.
   * I.e, all but 1 date fields are provided.
   */
  if (!day) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INVALID_DAY, errors);
  }

  if (!month) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INVALID_MONTH, errors);
  }

  if (!year) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INVALID_YEAR, errors);
  }

  /**
   * Check that a year has 4 digits.
   * E.g a year cannot be 200.
   */
  if (yearString.length < 4) {
    return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INVALID_YEAR_DIGITS, errors);
  }

  const dayNumber = Number(dayString);
  const monthNumber = Number(monthString);
  const yearNumber = Number(yearString);

  const submittedDate = createTimestampFromNumbers(dayNumber, monthNumber, yearNumber);

  if (submittedDate) {
    /**
     * Check that the date is valid. E.g:
     * A month cannot have a value of 13.
     * A day cannot have a value of 50 or over the maximum days in a month.
     */
    if (!isValid(submittedDate)) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.INVALID_DATE, errors);
    }

    /**
     * Check that the date is in the future.
     * A start date cannot be in the past.
     */
    if (!isFuture(endOfDay(submittedDate))) {
      return generateValidationErrors(FIELD_ID, ERROR_MESSAGE.BEFORE_EARLIEST, errors);
    }
  }

  /**
   * No date validation errors.
   * Return the provided errors object.
   */
  return errors;
};

export default requestedStartDateRules;
