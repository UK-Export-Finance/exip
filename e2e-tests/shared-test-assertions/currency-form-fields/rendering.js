/**
 * renderingAssertions
 * Rendering assertions for currency form fields.
 * @param {Function} radios: Assert currency radios
 * @param {Function} hint: Assert currency hint
 * @param {Function} alternativeCurrencyInput: Assert the alternative currency input
 * @param {Function} doesNotRenderSupportedCurrencies: Assert that the alternative currency input does NOT render supported currencies.
 * @returns {Function} Mocha describe block with assertions.
 */
const renderingAssertions = ({
  radios,
  legend,
  hint,
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
