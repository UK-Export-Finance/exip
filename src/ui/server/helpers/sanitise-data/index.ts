import { isNumber } from '../number';
import { isEmptyString, stripCommas } from '../string';
import { RequestBody } from '../../../types';
import { FIELD_IDS } from '../../constants';

const {
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER },
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    BROKER: { ADDRESS_LINE_1, ADDRESS_LINE_2, POSTCODE, NAME: BROKER_NAME },
  },
  POLICY_AND_EXPORTS: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
} = FIELD_IDS.INSURANCE;

/**
 * NUMBER_FIELDS
 * Add all number fields here
 * Explicit list of field IDs in the insurance forms that are number fields.
 * @returns {Array} Field IDs
 */
const NUMBER_FIELDS = [
  TOTAL_CONTRACT_VALUE,
  TOTAL_MONTHS_OF_COVER,
  TOTAL_SALES_TO_BUYER,
  MAXIMUM_BUYER_WILL_OWE,
  YEARS_EXPORTING,
  EMPLOYEES_INTERNATIONAL,
  EMPLOYEES_UK,
  ESTIMATED_ANNUAL_TURNOVER,
  PERCENTAGE_TURNOVER,
];

/**
 * STRING_NUMBER_FIELDS
 * Add all string fields here that could be numbers
 * Explicit exemptions list of field IDs in the insurance forms that are string fields that could be submitted as a pure number.
 * If one of these fields is pure numbers, our default "sanitise data" behaviour is to transform a string number into a number type.
 * However, we do not want this to happen with these fields. This means that:
 * - The data is saved correctly
 * - We avoid adding additional error handling in the UI.
 * - We avoid a "problem with service" page scenario where the data save fails, because it tries to save a number type as a text string type.
 * @returns {Array} Field IDs
 */
const STRING_NUMBER_FIELDS = [
  CREDIT_PERIOD_WITH_BUYER,
  DESCRIPTION,
  COMPANY_NUMBER,
  PHONE_NUMBER,
  GOODS_OR_SERVICES,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  POSTCODE,
  BROKER_NAME,
];

/**
 * shouldChangeToNumber
 * Check if a form field value should change from a string to a number
 * @param {String | Number} Field value
 * @returns {Boolean}
 */
const shouldChangeToNumber = (key: string, value: string | number) => {
  if (STRING_NUMBER_FIELDS.includes(key) || isEmptyString(String(value))) {
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
  // empty number fields cannot be sent and saved via the API because it is not a number.
  if (NUMBER_FIELDS.includes(key) && isEmptyString(value)) {
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

export { NUMBER_FIELDS, STRING_NUMBER_FIELDS, shouldChangeToNumber, sanitiseValue, isDayMonthYearField, shouldIncludeAndSanitiseField, sanitiseData };
