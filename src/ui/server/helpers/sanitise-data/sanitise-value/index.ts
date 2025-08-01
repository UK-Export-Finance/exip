import { isNumber } from '../../number';
import { isAString, isEmptyString, stripCommas } from '../../string';
import isValidWebsiteAddress from '../../is-valid-website-address';
import INSURANCE_FIELD_IDS from '../../../constants/field-ids/insurance';
import { SanitiseValueObjParams } from '../../../../types';

const {
  ACCOUNT: { ACCESS_CODE },
  COMPANIES_HOUSE: { COMPANY_NUMBER, COMPANY_SIC },
  DECLARATIONS: {
    MODERN_SLAVERY: {
      CONDITIONAL_REASONS: { CANNOT_ADHERE_TO_ALL_REQUIREMENTS, OFFENSES_OR_INVESTIGATIONS, AWARE_OF_EXISTING_SLAVERY },
    },
  },
  EXPORTER_BUSINESS: {
    YOUR_COMPANY: { PHONE_NUMBER },
    NATURE_OF_YOUR_BUSINESS: { GOODS_OR_SERVICES },
    TURNOVER: { PERCENTAGE_TURNOVER },
  },
  EXPORT_CONTRACT: {
    ABOUT_GOODS_OR_SERVICES: { DESCRIPTION },
    AGENT_CHARGES: { FIXED_SUM_AMOUNT, PERCENTAGE_CHARGE },
    HOW_WILL_YOU_GET_PAID: { PAYMENT_TERMS_DESCRIPTION },
    AGENT_SERVICE: { SERVICE_DESCRIPTION },
  },
  POLICY: {
    BROKER_DETAILS: { NAME: BROKER_NAME, BUILDING_NUMBER_OR_NAME, ADDRESS_LINE_1, ADDRESS_LINE_2 },
    BROKER_MANUAL_ADDRESS: { FULL_ADDRESS },
    LOSS_PAYEE_FINANCIAL_UK: { ACCOUNT_NUMBER, SORT_CODE },
    LOSS_PAYEE_FINANCIAL_INTERNATIONAL: { IBAN, BIC_SWIFT_CODE },
    CREDIT_PERIOD_WITH_BUYER,
    REQUESTED_JOINTLY_INSURED_PARTY: { COMPANY_NAME },
    FINANCIAL_ADDRESS,
  },
  YOUR_BUYER: {
    COMPANY_OR_ORGANISATION: { NAME, REGISTRATION_NUMBER, ADDRESS, WEBSITE },
    CONNECTION_WITH_BUYER_DESCRIPTION,
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
 * @returns {string[]} Field IDs
 */
export const STRING_NUMBER_FIELDS: string[] = [
  ACCESS_CODE,
  BUILDING_NUMBER_OR_NAME,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
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
  IBAN,
  BIC_SWIFT_CODE,
  PERCENTAGE_TURNOVER,
  FIXED_SUM_AMOUNT,
  PERCENTAGE_CHARGE,
  CONNECTION_WITH_BUYER_DESCRIPTION,
  CREDIT_PERIOD_WITH_BUYER,
  COMPANY_NAME,
  FULL_ADDRESS,
  FINANCIAL_ADDRESS,
  PAYMENT_TERMS_DESCRIPTION,
  SERVICE_DESCRIPTION,
  CANNOT_ADHERE_TO_ALL_REQUIREMENTS,
  OFFENSES_OR_INVESTIGATIONS,
  AWARE_OF_EXISTING_SLAVERY,
];

/**
 * replaceCharactersWithCharacterCode
 * Replace certain characters with character codes
 * @param {string} Field value
 * @returns {string}
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
 * @param {object} Field key and value
 * @returns {boolean}
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
 * @param {object} Field key and value
 * @returns {boolean}
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
