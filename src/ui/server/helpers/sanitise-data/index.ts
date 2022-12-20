import { isNumber } from '../number';
import { stripCommas } from '../string';
import { RequestBody } from '../../../types';
import stripEmptyFormFields from '../strip-empty-form-fields';

/**
 * shouldChangeToNumber
 * Check if a form field value should change from a string to a number
 * @param {String | Number} Field value
 * @returns {Boolean}
 */
const shouldChangeToNumber = (value: string | number) => {
  if (typeof value === 'string' && isNumber(value)) {
    return true;
  }

  if (typeof value === 'string') {
    const stripped = stripCommas(value);

    if (isNumber(stripped)) {
      return true;
    }
  }

  return false;
};

/**
 * sanitiseValue
 * Sanitise a form field value
 * @param {String | Number} Field value
 * @returns {Boolean}
 */
const sanitiseValue = (value: string | number | boolean) => {
  if (value === 'true' || value === true) {
    return true;
  }

  if (value === 'false' || value === false) {
    return false;
  }

  if (shouldChangeToNumber(value)) {
    const stripped = stripCommas(String(value));

    return Number(stripped);
  }

  return value;
};

/**
 * isDayMonthYearField
 * Checks if a field is a day, month or year field
 * @param {String} Form field name
 * @returns {Boolean}
 */
const isDayMonthYearField = (fieldName: string): boolean => {
  if (fieldName.includes('-day') || fieldName.includes('-month') || fieldName.includes('-year')) {
    return true;
  }

  return false;
};

/**
 * sanitiseData
 * Sanitise form data
 * @param {Express.Request.body} Form body
 * @returns {Object} sanitised form data
 */
const sanitiseData = (formBody: RequestBody) => {
  const formData = formBody;

  if (formData._csrf) {
    delete formData._csrf;
  }

  const sanitised = {};

  // strip any empty form fields
  const keys = Object.keys(stripEmptyFormFields(formData));

  keys.forEach((key) => {
    const value = formData[key];

    // do not include day/month/year fields, these should be captured as timestamps.
    if (!isDayMonthYearField(key)) {
      sanitised[key] = sanitiseValue(value);
    }
  });

  return sanitised;
};

export { shouldChangeToNumber, sanitiseValue, isDayMonthYearField, sanitiseData };
