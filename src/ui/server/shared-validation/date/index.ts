import { endOfDay, isFuture, isValid } from 'date-fns';
import generateValidationErrors from '../../helpers/validation';
import validDateFormatRules from './valid-format';
import createTimestampFromNumbers from '../../helpers/date/create-timestamp-from-numbers';
import getDaysInAMonth from '../../helpers/date/get-days-in-a-month';
import { DateValidationRulesParams, ValidationErrors } from '../../../types';

/**
 * dateRules
 * Check submitted form data for errors with a date field
 * Returns generateValidationErrors if there are any errors.
 * @param {Express.Response.body} formBody: Express response body
 * @param {Object} errors: Other validation errors for the same form
 * @param {String} fieldId: Date field ID
 * @param {Object} errorMessages: All possible error messages for the date field.
 * @returns {ValidationErrors}
 */
const dateRules = ({ formBody, errors, fieldId, errorMessages }: DateValidationRulesParams): ValidationErrors => {
  const dayId = `${fieldId}-day`;
  const monthId = `${fieldId}-month`;
  const yearId = `${fieldId}-year`;

  const dayString = formBody[dayId];
  const monthString = formBody[monthId];
  const yearString = formBody[yearId];

  if (!dayString && !monthString && !yearString) {
    return generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors);
  }

  const { hasErrors, errors: formatErrors } = validDateFormatRules({
    formBody,
    dayString,
    monthString,
    yearString,
    errors,
    errorMessages,
    fieldId,
  });

  if (hasErrors) {
    return formatErrors;
  }

  const dayNumber = Number(dayString);
  const monthNumber = Number(monthString);
  const yearNumber = Number(yearString);

  const submittedDate = createTimestampFromNumbers(dayNumber, monthNumber, yearNumber);

  if (submittedDate) {
    /**
     * Check that the date is valid. E.g:
     * A day cannot be greater than the last day in a month.
     * A month cannot have a value of 13.
     */
    const daysInMonth = getDaysInAMonth(monthNumber, yearNumber);

    if (dayNumber > daysInMonth) {
      return generateValidationErrors(fieldId, errorMessages.INVALID_DAY, errors);
    }

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
