const selectAltRadioButNoAltCurrency = ({ errorIndex = 0, rendersAlternativeCurrencyValidationError }) => {
  describe('when selecting the alternative currency radio and NOT entering an alternative currency via the autocomplete input', () => {
    it('should pre-select the alternative currency option and render validation errors', () => {
      rendersAlternativeCurrencyValidationError({ errorIndex });
    });
  });
};

export default selectAltRadioButNoAltCurrency;
