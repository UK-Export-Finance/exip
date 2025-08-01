import { INSURANCE_FIELD_IDS } from '../../constants/field-ids/insurance';
import { field as fieldSelector, radios, autoCompleteField } from '../../pages/shared';
import { errorSummaryListItems } from '../../partials';
import { checkAutocompleteInput } from '../autocomplete-assertions';
import { EUR, GBP, JPY, USD, NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME } from '../../fixtures/currencies';
import { DZA } from '../../fixtures/countries';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * returns field for currency/alternative currency
 * if currency provided, then returns radio for respective currency option
 * if no currency provided, then returns radio for alternative currency
 * @param {string} fieldId - fieldId for currency radio
 * @param {string} alternativeCurrencyFieldId - fieldId for alternative currency radio
 * @param {string} currency - Currency string
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
 * assertCurrencyFormFields
 * validates various parts of a form with currency fields.
 * @param {object} variables: Variables for a form with currency fields.
 * - fieldId: Field ID for currency radios
 * - legend: Text for legend component
 * - hint: Text for hint
 * - gbpCurrencyCheckedByDefault: Assert the GBP currency is checked by default.
 * - alternativeCurrencyText: Text for "another currency" input
 * - alternativeCurrencyFieldId: Field ID for "another currency" input
 * - errors: Error messages object
 */
const assertCurrencyFormFields = ({
  fieldId = CURRENCY_CODE,
  legend,
  hint,
  gbpCurrencyCheckedByDefault,
  alternativeCurrencyText,
  alternativeCurrencyFieldId = ALTERNATIVE_CURRENCY_CODE,
  errors,
}) => ({
  legend: legend ? () => cy.checkText(fieldSelector(fieldId).legend(), legend) : null,
  hint: hint ? () => cy.checkText(fieldSelector(fieldId).hint(), hint) : null,
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
    cy.checkTextAndValue({
      textSelector: option5.label(),
      expectedText: alternativeCurrencyText,
      valueSelector: option5,
      expectedValue: alternativeCurrencyFieldId,
    });
  },
  gbpCurrencyCheckedByDefault,
  assertGbpCurrencyCheckedByDefault: () => {
    const option = currencyRadio({ fieldId, currency: GBP.isoCode });

    cy.assertRadioOptionIsChecked(option.input());
  },
  alternativeCurrencyInput: () => {
    cy.clickAlternativeCurrencyRadioOption();

    checkAutocompleteInput.hasWorkingClientSideJS(autoCompleteField(alternativeCurrencyFieldId));
    checkAutocompleteInput.rendersInput(autoCompleteField(alternativeCurrencyFieldId));
  },
  doesNotRenderSupportedCurrencies: () => {
    cy.clickAlternativeCurrencyRadioOption();

    const field = autoCompleteField(alternativeCurrencyFieldId);

    checkAutocompleteInput.rendersNoResultsMessage(field, 'not a currency');
    // should not render radio values in alternate currency input
    checkAutocompleteInput.rendersNoResultsMessage(field, GBP.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(field, USD.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(field, JPY.isoCode);
    checkAutocompleteInput.rendersNoResultsMessage(field, EUR.isoCode);
  },
  rendersAlternativeCurrencies: () => {
    cy.clickAlternativeCurrencyRadioOption();

    checkAutocompleteInput.rendersSingleResult(autoCompleteField(alternativeCurrencyFieldId), 'Alg');
    checkAutocompleteInput.rendersMultipleResults(autoCompleteField(alternativeCurrencyFieldId), 'Be');

    const expectedValue = `${NON_STANDARD_CURRENCY_NAME} (${NON_STANDARD_CURRENCY_CODE})`;
    checkAutocompleteInput.allowsUserToRemoveCountryAndSearchAgain(alternativeCurrencyFieldId, DZA.NAME, NON_STANDARD_CURRENCY_NAME, expectedValue);
  },
  rendersAlternativeCurrencyValidationError: ({ errorIndex = 0, viaSaveAndBack }) => {
    cy.clickAlternativeCurrencyRadioOption();

    if (viaSaveAndBack) {
      cy.clickSaveAndBackButton();
    } else {
      cy.clickSubmitButton();
    }

    cy.checkText(errorSummaryListItems().eq(errorIndex), errors[alternativeCurrencyFieldId].IS_EMPTY);

    cy.checkText(fieldSelector(alternativeCurrencyFieldId).errorMessage(), `Error: ${errors[alternativeCurrencyFieldId].IS_EMPTY}`);
  },
  submitRadioAndAssertUrl: ({ currency, completeNonCurrencyFieldsFunction, url, viaSaveAndBack }) => {
    if (completeNonCurrencyFieldsFunction) {
      completeNonCurrencyFieldsFunction();
    }

    const option = currencyRadio({ fieldId, currency });

    option.label().click();

    if (viaSaveAndBack) {
      cy.clickSaveAndBackButton();
    } else {
      cy.clickSubmitButton();
    }

    cy.url().should('include', url);
  },
  submitAndAssertRadioIsChecked: ({ currency, completeNonCurrencyFieldsFunction, viaSaveAndBack }) => {
    if (completeNonCurrencyFieldsFunction) {
      completeNonCurrencyFieldsFunction();
    }

    const option = currencyRadio({ fieldId, currency });

    option.label().click();

    if (viaSaveAndBack) {
      cy.clickSaveAndBackButton();
    } else {
      cy.clickSubmitButton();
    }

    cy.go('back');

    cy.assertRadioOptionIsChecked(option.input());
  },
  submitAlternativeCurrencyAndAssertUrl: ({ url, viaSaveAndBack }) => {
    cy.clickAlternativeCurrencyRadioAndSubmitCurrency({
      fieldId: alternativeCurrencyFieldId,
      currency: NON_STANDARD_CURRENCY_NAME,
      viaSaveAndBack,
    });

    cy.url().should('include', url);
  },
  submitAlternativeCurrencyAndAssertInput: ({ viaSaveAndBack }) => {
    const option5 = currencyRadio({ alternativeCurrencyFieldId });

    // clicks alternative currency radio
    option5.label().click();

    // search for currency
    cy.autocompleteKeyboardInput(alternativeCurrencyFieldId, NON_STANDARD_CURRENCY_NAME);

    if (viaSaveAndBack) {
      cy.clickSaveAndBackButton();
    } else {
      cy.clickSubmitButton();
    }

    cy.go('back');

    cy.assertRadioOptionIsChecked(option5.input());

    const expectedValue = `${NON_STANDARD_CURRENCY_NAME} (${NON_STANDARD_CURRENCY_CODE})`;

    // alternative currency input should render correct result
    checkAutocompleteInput.checkInputResults(alternativeCurrencyFieldId, expectedValue);
  },
});

export default assertCurrencyFormFields;
