import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import selectAltRadioButNoAltCurrency from './select-alt-radio-but-no-alt-currency';
import submitAlternativeCurrency from './submit-alternative-currency';
import submitASupportedCurrency from './submit-a-supported-currency';

const { ALL_SECTIONS } = INSURANCE_ROUTES;

/**
 * formSubmissionAssertions
 * Form submission assertions for currency form fields.
 * @param {Number} errorIndex: Index of the first currency field error.
 * @param {String} expectedRedirectUrl: Page URL to assert after successful form submission
 * @param {Function} rendersAlternativeCurrencyValidationError: Assert alternative currency input validation error.
 * @param {Function} submitAndAssertRadioIsChecked: Submit a radio option and assert the radio is checked.
 * @param {Function} submitRadioAndAssertUrl: Submit a radio option and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertUrl: Submit an alternative currency and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertInput: Submit an alternative currency and assert the input.
 * @param {Function} completeNonCurrencyFieldsFunction: Optional function to complete non-currency form fields.
 * @returns {Object} Object with Mocha describe blocks and assertions for particular scenarios.
 */
const formSubmissionAssertions = ({
  errorIndex,
  expectedRedirectUrl,
  rendersAlternativeCurrencyValidationError,
  submitAndAssertRadioIsChecked,
  submitRadioAndAssertUrl,
  submitAlternativeCurrencyAndAssertUrl,
  submitAlternativeCurrencyAndAssertInput,
  completeNonCurrencyFieldsFunction,
}) => {
  const executeTests = () => {
    describe('currency form fields - form submission', () => {
      describe('via `continue` button', () => {
        selectAltRadioButNoAltCurrency({ errorIndex, rendersAlternativeCurrencyValidationError });

        submitASupportedCurrency({
          completeNonCurrencyFieldsFunction,
          submitRadioAndAssertUrl,
          submitAndAssertRadioIsChecked,
          expectedRedirectUrl,
        });

        submitAlternativeCurrency({
          expectedRedirectUrl,
          submitAlternativeCurrencyAndAssertUrl,
          submitAlternativeCurrencyAndAssertInput,
        });
      });

      describe('via `save and back` button', () => {
        // TODO
        // tests are failing - I think, need to update some functions/commands in assertions
        // to click save and back, instead of submit
        submitASupportedCurrency({
          completeNonCurrencyFieldsFunction,
          submitRadioAndAssertUrl,
          submitAndAssertRadioIsChecked,
          expectedRedirectUrl: ALL_SECTIONS,
          viaSaveAndBack: true,
        });

        submitAlternativeCurrency({
          expectedRedirectUrl: ALL_SECTIONS,
          submitAlternativeCurrencyAndAssertUrl,
          submitAlternativeCurrencyAndAssertInput,
        });
      });
    });
  };

  return { executeTests };
};

export default formSubmissionAssertions;