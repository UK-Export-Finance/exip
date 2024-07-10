import { isValid as isValidDate } from 'date-fns';
import { isAString, isEmptyString } from '../string';
import { isAnObjectWithKeysAndValues } from '../object';
import sanitiseObject from './sanitise-object';
import sanitiseArrayOfStrings from './sanitise-array-of-strings';
import INSURANCE_FIELD_IDS from '../../constants/field-ids/insurance';
import sanitiseValue from './sanitise-value';
export * from './sanitise-value';
import { RequestBody } from '../../../types';

type ObjectType = {
  [key: string]: any;
};

const {
  EXPORTER_BUSINESS: {
    NATURE_OF_YOUR_BUSINESS: { YEARS_EXPORTING, EMPLOYEES_UK },
    TURNOVER: { ESTIMATED_ANNUAL_TURNOVER, PERCENTAGE_TURNOVER },
  },
  EXPORT_CONTRACT: {
    AGENT_CHARGES: { PERCENTAGE_CHARGE, FIXED_SUM_AMOUNT },
  },
  POLICY: {
    CONTRACT_POLICY: {
      SINGLE: { TOTAL_CONTRACT_VALUE },
      MULTIPLE: { TOTAL_MONTHS_OF_COVER },
    },
    EXPORT_VALUE: {
      MULTIPLE: { TOTAL_SALES_TO_BUYER, MAXIMUM_BUYER_WILL_OWE },
    },
  },
} = INSURANCE_FIELD_IDS;

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
  EMPLOYEES_UK,
  ESTIMATED_ANNUAL_TURNOVER,
  PERCENTAGE_TURNOVER,
  PERCENTAGE_CHARGE,
  FIXED_SUM_AMOUNT,
];

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
  /**
   * Do not include day/month/year fields.
   * These should be captured as timestamps.
   */
  if (isDayMonthYearField(key)) {
    return false;
  }

  /**
   * EMS-793: Do not include number fields that are empty.
   * Empty number fields cannot be sent and saved via the API because it is not a number.
   */
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
export const sanitiseFormField = (key: string, value: string | boolean | null | ObjectType | Array<string>) => {
  if (Array.isArray(value)) {
    return sanitiseArrayOfStrings(key, value);
  }

  if (isValidDate(value)) {
    return value;
  }

  if (isAString(value)) {
    return sanitiseValue({ key, value: String(value) });
  }

  /**
   * If a value is null, it should be remain null.
   * Either, a null value has been submitted from a UI form,
   * Or it is intentionally being set to null during data mapping.
   */
  if (value === null) {
    return null;
  }

  const objectWithKeysAndValues = isAnObjectWithKeysAndValues(value);

  if (objectWithKeysAndValues) {
    return sanitiseObject(objectWithKeysAndValues);
  }

  if (typeof value === 'boolean') {
    return value;
  }

  return {};
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
