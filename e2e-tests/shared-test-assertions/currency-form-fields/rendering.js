/**
 * renderingAssertions
 * Rendering assertions for currency form fields.
 * @param {Function} legend: Assert currency radio legend
 * @param {Function} radios: Assert currency radios
 * @param {Function} hint: Assert currency hint
 * @param {Boolean} gbpCurrencyCheckedByDefault: Flag for if we should assert that the GBP currency is checked by default.
 * @param {Function} assertGbpCurrencyCheckedByDefault: Assert the GBP currency is checked by default.
 * @param {Function} alternativeCurrencyInput: Assert the alternative currency input
 * @param {Function} doesNotRenderSupportedCurrencies: Assert that the alternative currency input does NOT render supported currencies.
 * @param {Function} rendersAlternativeCurrencies: Assert that the alternative currency input renders valid alternate currencies
 * @returns {Function} Mocha describe block with assertions.
 */
const renderingAssertions = ({
  legend,
  radios,
  hint,
  gbpCurrencyCheckedByDefault,
  assertGbpCurrencyCheckedByDefault,
  alternativeCurrencyInput,
  doesNotRenderSupportedCurrencies,
  rendersAlternativeCurrencies,
}) => {
  describe('currency form fields - rendering', () => {
    if (legend) {
      it('renders a legend', () => {
        legend();
      });
    }

    if (hint) {
      it('renders a hint', () => {
        hint();
      });
    }

    it('renders currency radios', () => {
      radios();
    });

    if (gbpCurrencyCheckedByDefault) {
      it('renders a checked default GBP currency', () => {
        assertGbpCurrencyCheckedByDefault();
      });
    }

    it('renders alternative currency input', () => {
      alternativeCurrencyInput();
    });

    it('should NOT render invalid inputs or radio currencies in alternative currency input', () => {
      doesNotRenderSupportedCurrencies();
    });

    it('should render valid alternate currencies in alternative currency input', () => {
      rendersAlternativeCurrencies();
    });
  });
};

export default renderingAssertions;
