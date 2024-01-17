import generateValidationErrors from '../../../helpers/validation';
import { isNumber } from '../../../helpers/number';
import { DateValidationFormatRulesParams, DateValidationFormatRules } from '../../../../types';

/**
 * validDateFormatRules
 * Check the format of day/month/year strings.
 * @param {String} dayString: Day string
 * @param {String} monthString: Month string
 * @param {String} yearString: Year string
 * @param {Object} errors: Errors object from previous validation errors
 * @param {Object} errorMessages: All possible error messages for the date field.
 * @param {String} fieldId: Date field ID
 * @returns {ValidationErrors}
 */
const validDateFormatRules = ({
  dayString,
  monthString,
  yearString,
  errors,
  errorMessages,
  fieldId,
}: DateValidationFormatRulesParams): DateValidationFormatRules => {
  if (!dayString && !monthString && !yearString) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors),
    };
  }

  const day = isNumber(dayString);
  const month = isNumber(monthString);
  const year = isNumber(yearString);

  /**
   * All fields must be numbers.
   */
  if (!day && !month && !year) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INCORRECT_FORMAT, errors),
    };
  }

  /**
   * has a day,
   * no month or year.
   */
  if (day && !month && !year) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.MISSING_MONTH_AND_YEAR, errors),
    };
  }

  /**
   * has a month,
   * no day or year.
   */
  if (!day && month && !year) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.MISSING_DAY_AND_YEAR, errors),
    };
  }

  /**
   * has a year,
   * no day or month.
   */
  if (!day && !month && year) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.MISSING_DAY_AND_MONTH, errors),
    };
  }

  /**
   * Individual date field validation rules.
   * I.e, all but 1 date fields are provided.
   */
  if (!day) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INVALID_DAY, errors),
    };
  }

  if (!month) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INVALID_MONTH, errors),
    };
  }

  if (!year) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INVALID_YEAR, errors),
    };
  }

  /**
   * Check that a year has 4 digits.
   * E.g a year cannot be 200.
   */
  if (yearString.length < 4) {
    return {
      hasErrors: true,
      errors: generateValidationErrors(fieldId, errorMessages.INVALID_YEAR_DIGITS, errors),
    };
  }

  return {
    hasErrors: false,
    errors,
  };
};

export default validDateFormatRules;
