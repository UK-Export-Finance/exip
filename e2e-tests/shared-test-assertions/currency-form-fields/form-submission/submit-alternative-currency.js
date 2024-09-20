/**
 * submitAlternativeCurrency
 * Form submission assertions for submitting the alternative currency form field.
 * @param {String} expectedRedirectUrl: Page URL to assert after successful form submission
 * @param {Function} submitAlternativeCurrencyAndAssertUrl: Submit an alternative currency and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertInput: Submit an alternative currency and assert the input.
 * @returns {Object} Object with Mocha describe blocks and assertions for particular scenarios.
 */
const submitAlternativeCurrency = ({ expectedRedirectUrl, submitAlternativeCurrencyAndAssertUrl, submitAlternativeCurrencyAndAssertInput }) => {
  describe('when submitting an alternative currency', () => {
    it('should redirect to the next page', () => {
      submitAlternativeCurrencyAndAssertUrl(expectedRedirectUrl);
    });

    it('should render the submitted answer when going back to the page', () => {
      submitAlternativeCurrencyAndAssertInput();
    });
  });
};

export default submitAlternativeCurrency;
