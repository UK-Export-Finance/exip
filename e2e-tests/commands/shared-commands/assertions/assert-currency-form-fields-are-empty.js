import { radios } from '../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../constants/field-ids/insurance';
import { checkAutocompleteInput } from '../../../shared-test-assertions/autocomplete-assertions';
import { EUR, GBP, JPY, USD } from '../../../fixtures/currencies';

const {
  CURRENCY: { CURRENCY_CODE, ALTERNATIVE_CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

/**
 * assertCurrencyFormFieldsAreEmpty
 * Assert that all "currency" form fields are empty:
 * - 4x default options.
 * - "alternative currency" option
 * - "alternative currency" conditional autocomplete input.
 */
const assertCurrencyFormFieldsAreEmpty = () => {
  const fieldId = CURRENCY_CODE;

  const { option: option1 } = radios(fieldId, EUR.isoCode);
  const { option: option2 } = radios(fieldId, GBP.isoCode);
  const { option: option3 } = radios(fieldId, USD.isoCode);
  const { option: option4 } = radios(fieldId, JPY.isoCode);
  const { option: option5 } = radios(ALTERNATIVE_CURRENCY_CODE);

  cy.assertRadioOptionIsNotChecked(option1.input());
  cy.assertRadioOptionIsNotChecked(option2.input());
  cy.assertRadioOptionIsNotChecked(option3.input());
  cy.assertRadioOptionIsNotChecked(option4.input());
  cy.assertRadioOptionIsNotChecked(option5.input());

  cy.clickAlternativeCurrencyRadioOption();

  checkAutocompleteInput.checkEmptyResults();
};

export default assertCurrencyFormFieldsAreEmpty;
