import { field, radios, countryInput } from '../../pages/shared';
import {
  EUR,
  GBP,
  JPY,
  USD,
  AED,
} from '../../fixtures/currencies';
import checkAutocompleteInput from '../shared-commands/assertions/check-autocomplete-input';
import { DZA } from '../../fixtures/countries';

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
  alternativeCurrencyInput: () => {
    const { option: option5 } = radios(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.hasWorkingClientSideJS(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID));
    checkAutocompleteInput.rendersInput(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID));
  },
  alternativeCurrencyShouldRender: () => {
    const { option: option5 } = radios(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'test');
    // should not render radio values in alternate currency input
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), GBP.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), USD.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), JPY.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), EUR.isoCode);
  },
  alternativeCurrencyShouldNotRender: () => {
    const { option: option5 } = radios(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.rendersSingleResult(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'Alg');
    checkAutocompleteInput.rendersMultipleResults(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'Be');

    const expectedValue = `${AED.name} (${AED.isoCode})`;
    checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), DZA.NAME, AED.name, expectedValue);
  },
});

export default assertAlternativeCurrencyForm;
