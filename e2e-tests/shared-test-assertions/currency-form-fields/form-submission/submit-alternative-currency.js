/**
 * submitAlternativeCurrency
 * Form submission assertions for submitting the alternative currency form field.
 * @param {string} expectedRedirectUrl: Page URL to assert after successful form submission
 * @param {Function} submitAlternativeCurrencyAndAssertUrl: Submit an alternative currency and assert the URL.
 * @param {Function} submitAlternativeCurrencyAndAssertInput: Submit an alternative currency and assert the input.
 * @param {boolean} viaSaveAndBack: Flag whether to submit the form via the "save and back" button.
 * @returns {object} Object with Mocha describe blocks and assertions for particular scenarios.
 */
const submitAlternativeCurrency = ({ expectedRedirectUrl, submitAlternativeCurrencyAndAssertUrl, submitAlternativeCurrencyAndAssertInput, viaSaveAndBack }) => {
  describe('when submitting an alternative currency', () => {
    it('should redirect to the next page', () => {
      submitAlternativeCurrencyAndAssertUrl({ url: expectedRedirectUrl, viaSaveAndBack });
    });

    it('should render the submitted answer when going back to the page', () => {
      submitAlternativeCurrencyAndAssertInput({ viaSaveAndBack });
    });
  });
};

export default submitAlternativeCurrency;
