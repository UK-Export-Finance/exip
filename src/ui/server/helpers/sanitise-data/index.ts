import { isNumber } from '../number';
import { stripCommas } from '../string';
import { RequestBody } from '../../../types';
import { FIELD_IDS } from '../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
    YOUR_COMPANY: { PHONE_NUMBER },
  },
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: {
        TOTAL_MONTHS_OF_COVER,
        TOTAL_SALES_TO_BUYER,
        MAXIMUM_BUYER_WILL_OWE,
      },
    },
  },
} = FIELD_IDS.INSURANCE;

/**
 * shouldChangeToNumber
 * Check if a form field value should change from a string to a number
 * @param {String | Number} Field value
 * @returns {Boolean}
 */
const shouldChangeToNumber = (key: string, value: string | number) => {
  if (key === COMPANY_NUMBER || key === PHONE_NUMBER || value === '') {
    return false;
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
const sanitiseValue = (key: string, value: string | number | boolean) => {
  if (value === 'true' || value === true) {
    return true;
  }

  if (value === 'false' || value === false) {
    return false;
  }

  if (shouldChangeToNumber(key, value)) {
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
 * NUMBER_FIELDS
 * Explicit list of field IDs in the insurance forms that are number fields.
 * @returns {Array} Field IDs
 */
const NUMBER_FIELDS = [
  TOTAL_CONTRACT_VALUE,
  TOTAL_MONTHS_OF_COVER,
  TOTAL_SALES_TO_BUYER,
  MAXIMUM_BUYER_WILL_OWE,
];

/**
 * shouldIncludeAndSanitiseField
 * Check if we should include and sanitise a form field.
 * @param {String} Form field key/ID
 * @param {String} Form field value
 * @returns {Boolean}
 */
const shouldIncludeAndSanitiseField = (key: string, value: string) => {
  // do not include day/month/year fields, these should be captured as timestamps.
  if (isDayMonthYearField(key)) {
    return false;
  }

  // EMS-793: do not include number fields that are empty.
  // empty number fields cannot be sent and saved via the API beacuse it is not a number.
  if (NUMBER_FIELDS.includes(key) && value === '') {
    return false;
  }

  return true;
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

  const keys = Object.keys(formData);

  keys.forEach((key) => {
    const value = formData[key];

    if (shouldIncludeAndSanitiseField(key, value)) {
      sanitised[key] = sanitiseValue(key, value);
    }
  });

  return sanitised;
};

export { shouldChangeToNumber, sanitiseValue, isDayMonthYearField, NUMBER_FIELDS, shouldIncludeAndSanitiseField, sanitiseData };
