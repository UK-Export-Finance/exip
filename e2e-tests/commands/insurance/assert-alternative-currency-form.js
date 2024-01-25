import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field, radios, countryInput } from '../../pages/shared';
import {
  EUR,
  GBP,
  JPY,
  USD,
  NON_STANDARD_CURRENCY_CODE,
  NON_STANDARD_CURRENCY_NAME,
} from '../../fixtures/currencies';
import checkAutocompleteInput from '../shared-commands/assertions/check-autocomplete-input';
import { DZA } from '../../fixtures/countries';
import partials from '../../partials';

const { CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE } } = INSURANCE_FIELD_IDS;

/**
 * returns field for currency/alternative currency
 * if currency provided, then returns radio for respective currency option
 * if no currency provided, then returns radio for alternative currency
 * @param {String} fieldId - fieldId for currency radio
 * @param {String} alternativeCurrencyFieldId - fieldId for alternative currency radio
 * @param {String} currency - Currency string
 * @return {Function} radio
 */
const currencyRadio = ({ fieldId, currency, alternativeCurrencyFieldId = ALTERNATIVE_CURRENCY_CODE }) => {
  if (currency) {
    const { option } = radios(fieldId, currency);
    return option;
  }

  const { option } = radios(alternativeCurrencyFieldId);
  return option;
};

/**
 * assertAlternativeCurrencyForm
 * validates various parts of alternative currency form
 * @param {Object} variables - variables for alternative currency form
 * - fieldId - fieldId for currency radios
 * - legend - text for legend component
 * - hint - text for hint
 * - alternativeCurrencyText - text for "another currency" input
 * - ALTERNATIVE_CURRENCY_CODE - fieldId for "another currency" input
 * - errors - error message object
 */
const assertAlternativeCurrencyForm = ({
  fieldId = CURRENCY_CODE,
  legend,
  hint,
  alternativeCurrencyText,
  alternativeCurrencyFieldId = ALTERNATIVE_CURRENCY_CODE,
  errors,
}) => ({
  legend: () => cy.checkText(field(fieldId).legend(), legend),
  hint: () => cy.checkText(field(fieldId).hint(), hint),
  radios: () => {
    const option1 = currencyRadio({ fieldId, currency: EUR.isoCode });
    const option2 = currencyRadio({ fieldId, currency: GBP.isoCode });
    const option3 = currencyRadio({ fieldId, currency: USD.isoCode });
    const option4 = currencyRadio({ fieldId, currency: JPY.isoCode });
    const option5 = currencyRadio({ alternativeCurrencyFieldId });

    // EUR
    cy.checkCurrencyOption(option1, EUR);

    // GBP
    cy.checkCurrencyOption(option2, GBP);

    // USD
    cy.checkCurrencyOption(option3, USD);

    // JPY
    cy.checkCurrencyOption(option4, JPY);

    // Alternative currency
    cy.checkText(option5.label(), alternativeCurrencyText);
    cy.checkValue(option5, alternativeCurrencyFieldId);
  },
  alternativeCurrencyInput: () => {
    cy.clickAlternativeCurrencyRadioOption();

    checkAutocompleteInput.hasWorkingClientSideJS(countryInput.field(alternativeCurrencyFieldId));
    checkAutocompleteInput.rendersInput(countryInput.field(alternativeCurrencyFieldId));
  },
  doesNotRenderSupportedCurrencies: () => {
    cy.clickAlternativeCurrencyRadioOption();

    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(alternativeCurrencyFieldId), 'test');
    // should not render radio values in alternate currency input
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(alternativeCurrencyFieldId), GBP.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(alternativeCurrencyFieldId), USD.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(alternativeCurrencyFieldId), JPY.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(countryInput.field(alternativeCurrencyFieldId), EUR.isoCode);
  },
  rendersAlternativeCurrencies: () => {
    cy.clickAlternativeCurrencyRadioOption();

    checkAutocompleteInput.rendersSingleResult(countryInput.field(alternativeCurrencyFieldId), 'Alg');
    checkAutocompleteInput.rendersMultipleResults(countryInput.field(alternativeCurrencyFieldId), 'Be');

    const expectedValue = `${NON_STANDARD_CURRENCY_CODE.name} (${NON_STANDARD_CURRENCY_CODE.isoCode})`;
    checkAutocompleteInput
      .allowsUserToRemoveCountryAndSearchAgain(countryInput.field(alternativeCurrencyFieldId), DZA.NAME, NON_STANDARD_CURRENCY_CODE.name, expectedValue);
  },
  rendersAlternativeCurrencyValidationError: () => {
    cy.clickAlternativeCurrencyRadioOption();

    cy.clickSubmitButton();

    cy.checkText(
      partials.errorSummaryListItems().first(),
      errors[alternativeCurrencyFieldId].IS_EMPTY,
    );

    cy.checkText(
      field(alternativeCurrencyFieldId).errorMessage(),
      `Error: ${errors[alternativeCurrencyFieldId].IS_EMPTY}`,
    );
  },
  submitRadioAndAssertUrl: (currency, redirectUrl) => {
    cy.clickAlternativeCurrencyRadioOption();

    cy.clickSubmitButton();

    cy.assertUrl(redirectUrl);
  },
  submitAndAssertRadioIsChecked: (currency, url) => {
    const option = currencyRadio({ fieldId, currency });

    cy.clickAlternativeCurrencyRadioOption();

    cy.clickSubmitButton();

    cy.navigateToUrl(url);

    // currency radio should be checked
    option.input().should('be.checked');
  },
  submitAlternativeCurrencyAndAssertUrl: (redirectUrl) => {
    cy.clickAlternativeCurrencyRadioOption();

    // search for country
    checkAutocompleteInput.search(countryInput.field(alternativeCurrencyFieldId), NON_STANDARD_CURRENCY_NAME);

    cy.clickSubmitButton();
    // asserts redirect URL is correct
    cy.assertUrl(redirectUrl);
  },
  submitAlternativeCurrencyAndAssertInput: (url) => {
    const option5 = currencyRadio({ alternativeCurrencyFieldId });

    // clicks alternative currency radio
    option5.input().click();

    // searches for currency
    checkAutocompleteInput.search(countryInput.field(alternativeCurrencyFieldId), NON_STANDARD_CURRENCY_NAME);

    cy.clickSubmitButton();

    cy.navigateToUrl(url);

    // alternative currency radio should be checked
    option5.input().should('be.checked');

    const expectedValue = `${NON_STANDARD_CURRENCY_NAME} (${NON_STANDARD_CURRENCY_CODE.isoCode})`;
    // alternative currency input should render correct result
    checkAutocompleteInput.checkInput(countryInput.field(alternativeCurrencyFieldId), expectedValue);
  },
});

export default assertAlternativeCurrencyForm;
