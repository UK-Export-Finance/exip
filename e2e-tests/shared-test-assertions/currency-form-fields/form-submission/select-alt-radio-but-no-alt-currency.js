/**
 * selectAltRadioButNoAltCurrency
 * Mocha describe block and assertion for selecting the "alternative currency" radio
 * and then NOT entering a currency via the autocomplete input.
 * @param {Number} errorIndex: Index of the currency field error.
 * @param {Function} rendersAlternativeCurrencyValidationError: Assert alternative currency input validation error.
 * @returns {Object} Object with Mocha describe block and assertion
 */
const selectAltRadioButNoAltCurrency = ({ errorIndex = 0, rendersAlternativeCurrencyValidationError }) => {
  describe('when selecting the alternative currency radio and NOT entering an alternative currency via the autocomplete input', () => {
    it('should pre-select the alternative currency option and render validation errors', () => {
      rendersAlternativeCurrencyValidationError({ errorIndex });
    });
  });
};

export default selectAltRadioButNoAltCurrency;
