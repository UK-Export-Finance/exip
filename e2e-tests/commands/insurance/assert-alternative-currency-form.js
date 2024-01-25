import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
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
import partials from '../../partials';

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

const whichField = (FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, currency) => {
  if (currency) {
    const { option } = radios(FIELD_ID, currency);
    return option;
  }

  const { option } = radios(ALTERNATIVE_CURRENCY_FIELD_ID);
  return option;
};

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
  FIELD_ID = CURRENCY_CODE,
  LEGEND,
  HINT,
  ALTERNATIVE_CURRENCY_TEXT,
  ALTERNATIVE_CURRENCY_FIELD_ID = ALTERNATIVE_CURRENCY_CODE,
  ERRORS,
}) => ({
  legend: () => cy.checkText(field(FIELD_ID).legend(), LEGEND),
  hint: () => cy.checkText(field(FIELD_ID).hint(), HINT),
  radios: () => {
    const option1 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, EUR.isoCode);
    const option2 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, GBP.isoCode);
    const option3 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, USD.isoCode);
    const option4 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, JPY.isoCode);
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

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
    const { option: option5 } = radios(ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.hasWorkingClientSideJS(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID));
    checkAutocompleteInput.rendersInput(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID));
  },
  doesNotRenderSupportedCurrencies: () => {
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'test');
    // should not render radio values in alternate currency input
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), GBP.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), USD.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), JPY.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), EUR.isoCode);
  },
  rendersAlternativeCurrencies: () => {
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();

    checkAutocompleteInput.rendersSingleResult(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'Alg');
    checkAutocompleteInput.rendersMultipleResults(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), 'Be');

    const expectedValue = `${AED.name} (${AED.isoCode})`;
    checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), DZA.NAME, AED.name, expectedValue);
  },
  rendersAlternativeCurrencyValidationError: () => {
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    option5.input().click();
    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().first(),
      ERRORS[ALTERNATIVE_CURRENCY_FIELD_ID].IS_EMPTY,
    );

    cy.checkText(
      field(ALTERNATIVE_CURRENCY_FIELD_ID).errorMessage(),
      `Error: ${ERRORS[ALTERNATIVE_CURRENCY_FIELD_ID].IS_EMPTY}`,
    );
  },
  submitRadioRedirect: (CURRENCY, REDIRECT_URL) => {
    const option = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, CURRENCY);

    option.input().click();
    cy.clickSubmitButton();

    cy.assertUrl(REDIRECT_URL);
  },
  submitRadioCheckRadio: (CURRENCY, url) => {
    const option = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID, CURRENCY);

    option.input().click();
    cy.clickSubmitButton();

    cy.navigateToUrl(url);

    // currency radio should be checked
    option.input().should('be.checked');
  },
  submitAlternativeCurrencyRedirect: (REDIRECT_URL) => {
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);
    // clicks alternative currency radio
    option5.input().click();

    // search for country
    checkAutocompleteInput.search(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), AED.name);

    cy.clickSubmitButton();
    // asserts redirect URL is correct
    cy.assertUrl(REDIRECT_URL);
  },
  submitAlternativeCurrencyCheck: (url) => {
    const option5 = whichField(FIELD_ID, ALTERNATIVE_CURRENCY_FIELD_ID);

    // clicks alternative currency radio
    option5.input().click();

    // searches for currency
    checkAutocompleteInput.search(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), AED.name);

    cy.clickSubmitButton();

    cy.navigateToUrl(url);

    // alternative currency radio should be checked
    option5.input().should('be.checked');

    const expectedValue = `${AED.name} (${AED.isoCode})`;
    // alternative currency input should render correct result
    checkAutocompleteInput.checkInput(countryInput.field(ALTERNATIVE_CURRENCY_FIELD_ID), expectedValue);
  },
});

export default assertAlternativeCurrencyForm;
