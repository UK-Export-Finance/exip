import { endOfDay, isFuture, isValid } from 'date-fns';
import generateValidationErrors from '../../helpers/validation';
import createTimestampFromNumbers from '../../helpers/date/create-timestamp-from-numbers';
import { isNumber } from '../../helpers/number';
import { RequestBody, DateErrorMessage, ValidationErrors } from '../../../types';

interface DateRulesTempType {
  formBody: RequestBody;
  errors: object;
  fieldId: string;
  errorMessages: DateErrorMessage;
}

/**
 * dateRules
 * Check submitted form data for errors with a date field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} formBody: Express response body
 * @param {Object} errors: Errors object from previous validation errors
 * @param {String} fieldId: Date field ID
 * @returns {Object} errorMessages: All possible error messages for the date field.
 */
const dateRules = ({ formBody, errors, fieldId, errorMessages }: DateRulesTempType): ValidationErrors => {
  const dayId = `${fieldId}-day`;
  const monthId = `${fieldId}-month`;
  const yearId = `${fieldId}-year`;

  const dayString = formBody[dayId];
  const monthString = formBody[monthId];
  const yearString = formBody[yearId];

  if (!dayString && !monthString && !yearString) {
    return generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors);
  }

  const day = isNumber(dayString);
  const month = isNumber(monthString);
  const year = isNumber(yearString);

  /**
   * All fields must be numbers.
   */
  if (!day && !month && !year) {
    return generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors);
  }

  /**
   * has a day,
   * no month or year.
   */
  if (day && !month && !year) {
    return generateValidationErrors(fieldId, errorMessages.MISSING_MONTH_AND_YEAR, errors);
  }

  /**
   * has a month,
   * no day or year.
   */
  if (!day && month && !year) {
    return generateValidationErrors(fieldId, errorMessages.MISSING_DAY_AND_YEAR, errors);
  }

  /**
   * has a year,
   * no day or month.
   */
  if (!day && !month && year) {
    return generateValidationErrors(fieldId, errorMessages.MISSING_DAY_AND_MONTH, errors);
  }

  /**
   * Individual date field validation rules.
   * I.e, all but 1 date fields are provided.
   */
  if (!day) {
    return generateValidationErrors(fieldId, errorMessages.INVALID_DAY, errors);
  }

  if (!month) {
    return generateValidationErrors(fieldId, errorMessages.INVALID_MONTH, errors);
  }

  if (!year) {
    return generateValidationErrors(fieldId, errorMessages.INVALID_YEAR, errors);
  }

  /**
   * Check that a year has 4 digits.
   * E.g a year cannot be 200.
   */
  if (yearString.length < 4) {
    return generateValidationErrors(fieldId, errorMessages.INVALID_YEAR_DIGITS, errors);
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
      return generateValidationErrors(fieldId, errorMessages.INVALID_DATE, errors);
    }

    /**
     * Check that the date is in the future.
     * A date cannot be in the past.
     */
    if (!isFuture(endOfDay(submittedDate))) {
      return generateValidationErrors(fieldId, errorMessages.BEFORE_EARLIEST, errors);
    }
  }

  /**
   * No date validation errors.
   * Return the provided errors object.
   */
  return errors;
};

export default dateRules;
