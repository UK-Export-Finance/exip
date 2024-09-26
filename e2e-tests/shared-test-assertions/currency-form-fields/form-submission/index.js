import { INSURANCE_ROUTES } from '../../../constants/routes/insurance';
import selectAltRadioButNoAltCurrency from './select-alt-radio-but-no-alt-currency';
import submitAlternativeCurrency from './submit-alternative-currency';
import submitASupportedCurrency from './submit-a-supported-currency';

const { ALL_SECTIONS } = INSURANCE_ROUTES;

/**
 * formSubmissionAssertions
 * Form submission assertions for currency form fields.
 * @param {Number} errorIndex: Index of the currency field error.
 * @param {String} expectedRedirectUrl: Page URL to assert after successful form submission
 * @param {Function} rendersAlternativeCurrencyValidationError: Assert alternative currency input validation error.
 * @param {Function} submitAndAssertRadioIsChecked: Submit a radio option and assert the radio is checked.
 * @param {Function} submitRadioAndAssertUrl: Submit a radio option and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertUrl: Submit an alternative currency and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertInput: Submit an alternative currency and assert the input.
 * @param {Function} completeNonCurrencyFieldsFunction: Optional function to complete non-currency form fields.
 * @param {Boolean} hasSaveAndBack: Temporary Flag for if the form has "save and back" functionality
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
  hasSaveAndBack,
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

      if (hasSaveAndBack) {
        describe('via `save and back` button', () => {
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
            viaSaveAndBack: true,
          });
        });
      }
    });
  };

  return { executeTests };
};

export default formSubmissionAssertions;
