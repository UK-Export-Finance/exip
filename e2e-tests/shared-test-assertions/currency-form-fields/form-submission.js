import {
  EUR_CURRENCY_CODE, GBP_CURRENCY_CODE, USD_CURRENCY_CODE, JPY_CURRENCY_CODE,
} from '../../fixtures/currencies';

/**
 * formSubmissionAssertions
 * Form submission assertions for currency form fields.
 * @param {Function} rendersAlternativeCurrencyValidationError: Assert alternative currency input validation error.
 * @param {Function} submitAndAssertRadioIsChecked: Submit a radio option and assert the radio is checked.
 * @param {Function} submitRadioAndAssertUrl: Submit a radio option and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertUrl: Submit an alternative currency and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertInput: Submit an alternative currency and assert the input.
 * @returns {Object} Object with Mocha describe blocks and assertions for particular scenarios.
 */
const formSubmissionAssertions = ({
  rendersAlternativeCurrencyValidationError,
  submitAndAssertRadioIsChecked,
  submitRadioAndAssertUrl,
  submitAlternativeCurrencyAndAssertUrl,
  submitAlternativeCurrencyAndAssertInput,
}) => {
  const selectAltRadioButNoAltCurrency = ({ errorIndex = 0 }) => {
    describe('when selecting the alternative currency radio and NOT entering an alternative currency via the autocomplete input', () => {
      it('should render validation errors', () => {
        rendersAlternativeCurrencyValidationError({ errorIndex });
      });
    });
  };

  const submitASupportedCurrency = ({ url, completeNonCurrencyFields }) => {
    describe('when submitting a supported currency', () => {
      describe(EUR_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl({
            currency: EUR_CURRENCY_CODE,
            url,
            completeNonCurrencyFields,
          });
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked({
            currency: EUR_CURRENCY_CODE,
            completeNonCurrencyFields,
          });
        });
      });

      describe(GBP_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl({
            currency: GBP_CURRENCY_CODE,
            url,
            completeNonCurrencyFields,
          });
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked({
            currency: GBP_CURRENCY_CODE,
            completeNonCurrencyFields,
          });
        });
      });

      describe(USD_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl({
            currency: USD_CURRENCY_CODE,
            url,
            completeNonCurrencyFields,
          });
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked({
            currency: USD_CURRENCY_CODE,
            completeNonCurrencyFields,
          });
        });
      });

      describe(JPY_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl({
            currency: JPY_CURRENCY_CODE,
            url,
            completeNonCurrencyFields,
          });
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked({
            currency: JPY_CURRENCY_CODE,
            completeNonCurrencyFields,
          });
        });
      });
    });
  };

  const submitAlternativeCurrency = ({ url }) => {
    describe('when submitting an alternative currency', () => {
      it('should redirect to the next page', () => {
        submitAlternativeCurrencyAndAssertUrl(url);
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAlternativeCurrencyAndAssertInput();
      });
    });
  };

  return {
    selectAltRadioButNoAltCurrency,
    submitASupportedCurrency,
    submitAlternativeCurrency,
  };
};

export default formSubmissionAssertions;
