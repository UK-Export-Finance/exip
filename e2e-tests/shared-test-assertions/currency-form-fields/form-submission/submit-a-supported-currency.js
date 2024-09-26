import { EUR_CURRENCY_CODE, GBP_CURRENCY_CODE, USD_CURRENCY_CODE, JPY_CURRENCY_CODE } from '../../../fixtures/currencies';

/**
 * submitASupportedCurrency
 * Form submission assertions for submitting a supported currency form field.
 * @param {String} expectedRedirectUrl: Page URL to assert after successful form submission
 * @param {Function} completeNonCurrencyFieldsFunction: Optional function to complete non-currency form fields.
 * @param {Function} submitRadioAndAssertUrl: Submit a radio option and assert the URL.
 * @param {Function} submitAndAssertRadioIsChecked: Submit a radio option and assert the radio is checked.
 * @param {Boolean} viaSaveAndBack: Flag whether to submit the form via the "save and back" button.
 * @returns {Object} Object with Mocha describe blocks and assertions for particular scenarios.
 */
const submitASupportedCurrency = ({
  expectedRedirectUrl,
  completeNonCurrencyFieldsFunction,
  submitRadioAndAssertUrl,
  submitAndAssertRadioIsChecked,
  viaSaveAndBack = false,
}) => {
  describe('when submitting a supported currency', () => {
    describe(EUR_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: EUR_CURRENCY_CODE,
          url: expectedRedirectUrl,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: EUR_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(GBP_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: GBP_CURRENCY_CODE,
          url: expectedRedirectUrl,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: GBP_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(USD_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: USD_CURRENCY_CODE,
          url: expectedRedirectUrl,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: USD_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });

    describe(JPY_CURRENCY_CODE, () => {
      it('should redirect to the next page', () => {
        submitRadioAndAssertUrl({
          currency: JPY_CURRENCY_CODE,
          url: expectedRedirectUrl,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });

      it('should render the submitted answer when going back to the page', () => {
        submitAndAssertRadioIsChecked({
          currency: JPY_CURRENCY_CODE,
          completeNonCurrencyFieldsFunction,
          viaSaveAndBack,
        });
      });
    });
  });
};

export default submitASupportedCurrency;
