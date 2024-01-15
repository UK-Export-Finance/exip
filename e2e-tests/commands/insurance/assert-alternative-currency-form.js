import { field, radios } from '../../pages/shared';
import {
  EUR,
  GBP,
  JPY,
  USD,
} from '../../fixtures/currencies';

/**
 * assertAlternativeCurrencyForm
 * validates various parts of alternative currency form
 * @param {Object} variables - variables for alternative currency form
 * - FIELD_ID - fieldId for currency radios
 * - LEGEND - text for legend component
 * - HINT - text for hint
 * - ALTERNATIVE_CURRENCY_TEXT - text for "another currency" input
 * - ALTERNATIVE_CURRENCY_CODE - fieldId for "another currency" input
 */
const assertAlternativeCurrencyForm = ({
  FIELD_ID, LEGEND, HINT, ALTERNATIVE_CURRENCY_TEXT, ALTERNATIVE_CURRENCY_FIELD_ID,
}) => ({
  legend: () => cy.checkText(field(FIELD_ID).legend(), LEGEND),
  hint: () => cy.checkText(field(FIELD_ID).hint(), HINT),
  radios: () => {
    const { option: option1 } = radios(FIELD_ID, EUR.isoCode);
    const { option: option2 } = radios(FIELD_ID, GBP.isoCode);
    const { option: option3 } = radios(FIELD_ID, USD.isoCode);
    const { option: option4 } = radios(FIELD_ID, JPY.isoCode);
    const { option: option5 } = radios(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    // EUR
    cy.checkCurrencyOption(option1, EUR);

    // GBP
    cy.checkCurrencyOption(option2, GBP);

    // USD
    cy.checkCurrencyOption(option3, USD);

    // JPY
    cy.checkCurrencyOption(option4, JPY);

    // Alternative currency
    cy.checkText(option5.label(), ALTERNATIVE_CURRENCY_TEXT);
    cy.checkValue(option5, ALTERNATIVE_CURRENCY_FIELD_ID);
  },
});

export default assertAlternativeCurrencyForm;
