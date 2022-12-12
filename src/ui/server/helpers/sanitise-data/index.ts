import { isNumber } from '../number';
import { stripCommas } from '../string';
import { RequestBody, SubmittedData } from '../../../types';

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
 * sanitiseData
 * Sanitise form data
 * @param {Express.Request.body} Form body
 * @returns {Object} sanitised form data
 */
const sanitiseData = (formData: RequestBody) => {
  const sanitised = {} as SubmittedData;
  const keys = Object.keys(formData);

  keys.forEach((key) => {
    const value = formData[key];

    sanitised[key] = sanitiseValue(value);
  });

  return sanitised;
};

export { shouldChangeToNumber, sanitiseValue, sanitiseData };
