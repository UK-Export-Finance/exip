import { isNumber } from '../../number';
import { isAString, isEmptyString, stripCommas } from '../../string';
import isValidWebsiteAddress from '../../is-valid-website-address';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { SanitiseValueObjParams } from '../../../../types';

const {
  ACCOUNT: { ACCESS_CODE },
  COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
    TURNOVER: { PERCENTAGE_TURNOVER },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME },
    LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, WEBSITE },
  },
} = INSURANCE_FIELD_IDS;

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
  ACCESS_CODE,
  DESCRIPTION,
  COMPANY_NUMBER,
  COMPANY_SIC,
  PHONE_NUMBER,
  GOODS_OR_SERVICES,
  BROKER_NAME,
  NAME,
  REGISTRATION_NUMBER,
  ADDRESS,
  ACCOUNT_NUMBER,
  SORT_CODE,
  PERCENTAGE_TURNOVER,
];

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

  if (isAString(value)) {
    const stripped = stripCommas(String(value));

    if (isNumber(stripped)) {
      return true;
    }
  }

  return false;
};

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
     * Otherwise, it becomes invalid.
     */
    if (key === WEBSITE && isValidWebsiteAddress(String(value))) {
      return value;
    }
  }

  return replaceCharactersWithCharacterCode(String(value));
};

export default sanitiseValue;
