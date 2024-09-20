const submitAlternativeCurrency = ({ url, submitAlternativeCurrencyAndAssertUrl, submitAlternativeCurrencyAndAssertInput }) => {
  describe('when submitting an alternative currency', () => {
    it('should redirect to the next page', () => {
      submitAlternativeCurrencyAndAssertUrl(url);
    });

    it('should render the submitted answer when going back to the page', () => {
      submitAlternativeCurrencyAndAssertInput();
    });
  });
};

export default submitAlternativeCurrency;
