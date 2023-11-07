import { isValid as isValidDate } from 'date-fns';
import { isNumber } from '../number';
import { isEmptyString, stripCommas } from '../string';
import { objectHasKeysAndValues } from '../object';
import { FIELD_IDS } from '../../constants';
import isValidWebsiteAddress from '../is-valid-website-address';
import { SanitiseValueObjParams, RequestBody } from '../../../types';

const {
  ACCOUNT: { SECURITY_CODE },
  EXPORTER_BUSINESS: {
    COMPANY_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES, YEARS_EXPORTING, EMPLOYEES_INTERNATIONAL, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
    BROKER: { ADDRESS_LINE_1, ADDRESS_LINE_2, POSTCODE, NAME: BROKER_NAME },
  },
  POLICY: {
    CONTRACT_POLICY: {
      CREDIT_PERIOD_WITH_BUYER,
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER, TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, FIRST_NAME, LAST_NAME, POSITION, WEBSITE },
  },
} = FIELD_IDS.INSURANCE;

/**
 * NUMBER_FIELDS
 * Add all number fields here
 * Explicit list of field IDs in the insurance forms that are number fields.
 * @returns {Array} Field IDs
 */
export const NUMBER_FIELDS = [
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
export const STRING_NUMBER_FIELDS = [
  SECURITY_CODE,
  CREDIT_PERIOD_WITH_BUYER,
  DESCRIPTION,
  COMPANY_NUMBER,
  COMPANY_SIC,
  PHONE_NUMBER,
  GOODS_OR_SERVICES,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  POSTCODE,
  BROKER_NAME,
  NAME,
  REGISTRATION_NUMBER,
  ADDRESS,
  FIRST_NAME,
  LAST_NAME,
  POSITION,
];

/**
 * shouldChangeToNumber
 * Check if a form field value should change from a string to a number
 * @param {Object} Field key and value
 * @returns {Boolean}
 */
export const shouldChangeToNumber = ({ key, value }: SanitiseValueObjParams) => {
  if (key) {
    if (STRING_NUMBER_FIELDS.includes(key) || isEmptyString(String(value))) {
      return false;
    }
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
 * replaceCharactersWithCharacterCode
 * Replace certain characters with character codes
 * @param {String} Field value
 * @returns {String}
 */
export const replaceCharactersWithCharacterCode = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/\*/g, '&#42;');

/**
 * sanitiseValue
 * Sanitise a form field value
 * @param {Object} Field key and value
 * @returns {Boolean}
 */
export const sanitiseValue = ({ key, value }: SanitiseValueObjParams) => {
  if (value === 'true' || value === true) {
    return true;
  }

  if (value === 'false' || value === false) {
    return false;
  }

  if (shouldChangeToNumber({ key, value })) {
    const stripped = stripCommas(String(value));

    return Number(stripped);
  }

  if (key) {
    /**
     * Do not sanitise a valid website address.
     * Otherwise, the it becomes invalid.
     */
    if (key === WEBSITE && isValidWebsiteAddress(String(value))) {
      return value;
    }
  }

  return replaceCharactersWithCharacterCode(String(value));
};

/**
 * sanitiseObject
 * Sanitise an object
 * @param {Object}
 * @returns {Boolean}
 */
export const sanitiseObject = (obj: object) => {
  const sanitised = {};

  Object.keys(obj).forEach((key) => {
    const value = obj[key];

    sanitised[key] = sanitiseValue({ key, value });
  });

  return sanitised;
};

/**
 * sanitiseArray
 * Sanitise an array
 * @param {String} Field key
 * @param {Array}
 * @returns {Array}
 */
export const sanitiseArray = (key: string, arr: Array<string> | Array<object>) => {
  const sanitised = arr.map((value) => {
    if (typeof value === 'object' && objectHasKeysAndValues(value)) {
      return sanitiseObject(value);
    }

    if (typeof value === 'string') {
      return sanitiseValue({ key, value });
    }

    return null;
  });

  return sanitised;
};

/**
 * isDayMonthYearField
 * Checks if a field is a day, month or year field
 * @param {String} Form field name
 * @returns {Boolean}
 */
export const isDayMonthYearField = (fieldName: string): boolean => {
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
export const shouldIncludeAndSanitiseField = (key: string, value: string) => {
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
 * sanitiseFormField
 * Sanitise a form field, depending on the field type/value
 * @param {String} Form field key
 * @param {String | Boolean | Object | Array} Form field value
 * @returns {String | Boolean | Object | Array}
 */
export const sanitiseFormField = (key: string, value: string | boolean | object | Array<string>) => {
  if (Array.isArray(value)) {
    return sanitiseArray(key, value);
  }

  if (isValidDate(value)) {
    return value;
  }

  if (typeof value === 'string') {
    return sanitiseValue({ key, value });
  }

  if (typeof value === 'object') {
    if (objectHasKeysAndValues(value)) {
      return sanitiseObject(value);
    }

    return {};
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return null;
};

/**
 * sanitiseData
 * Sanitise form data
 * @param {Express.Request.body} Form body
 * @returns {Object} sanitised form data
 */
export const sanitiseData = (formBody: RequestBody) => {
  const formData = formBody;

  if (formData._csrf) {
    delete formData._csrf;
  }

  const sanitised = {};

  const keys = Object.keys(formData);

  keys.forEach((key) => {
    const value = formData[key];

    if (shouldIncludeAndSanitiseField(key, value)) {
      sanitised[key] = sanitiseFormField(key, value);
    }
  });

  return sanitised;
};
