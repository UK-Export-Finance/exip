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
  const selectAltRadioButNoAltCurrency = () => {
    describe('when selecting the alternative currency radio and NOT entering an alternative currency via the autocomplete input', () => {
      it('should render validation errors', () => {
        rendersAlternativeCurrencyValidationError();
      });
    });
  };

  const submitASupportedCurrency = (url) => {
    describe('when submitting a supported currency', () => {
      describe(EUR_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(EUR_CURRENCY_CODE, url);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(EUR_CURRENCY_CODE, url);
        });
      });

      describe(GBP_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(GBP_CURRENCY_CODE, url);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(GBP_CURRENCY_CODE, url);
        });
      });

      describe(USD_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(USD_CURRENCY_CODE, url);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(USD_CURRENCY_CODE, url);
        });
      });

      describe(JPY_CURRENCY_CODE, () => {
        it('should redirect to the next page', () => {
          submitRadioAndAssertUrl(JPY_CURRENCY_CODE, url);
        });

        it('should render the submitted answer when going back to the page', () => {
          submitAndAssertRadioIsChecked(JPY_CURRENCY_CODE, url);
        });
      });
    });
  };

  const submitAlternativeCurrency = (url) => {
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
