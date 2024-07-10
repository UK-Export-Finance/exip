import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { NON_STANDARD_CURRENCY_NAME } from '../../../fixtures/currencies';

const {
  CURRENCY: { ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * completeAlternativeCurrencyField
 * Complete an "alternative currency" field
 * @param {String} fieldId: Field ID. Defaults to ALTERNATIVE_CURRENCY_CODE
 * @param {String} currency: Currency. Defaults to NON_STANDARD_CURRENCY_NAME
 */
const completeAlternativeCurrencyField = ({ fieldId = ALTERNATIVE_CURRENCY_CODE, currency = NON_STANDARD_CURRENCY_NAME }) => {
  cy.autocompleteKeyboardInput(fieldId, currency);
};

export default completeAlternativeCurrencyField;
