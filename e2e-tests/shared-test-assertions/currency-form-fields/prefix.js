import {
  SYMBOLS, USD_CURRENCY_CODE, JPY_CURRENCY_CODE, EUR_CURRENCY_CODE,
} from '../../fixtures/currencies';

/**
 * prefixAssertions
 * Prefix assertions for currency form fields.
 * @param {String} fieldId: Field ID of input for prefix assertion
 * @returns {Function} Mocha describe block with assertions.
 */
const prefixAssertions = ({ fieldId }) => {
  describe('when not selecting a currency', () => {
    it(`should display ${SYMBOLS.GBP} as the prefix`, () => {
      cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });
    });
  });

  describe(`when selecting ${USD_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.USD} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: USD_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.USD });
    });
  });

  describe(`when selecting ${JPY_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.JPY} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: JPY_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.JPY });
    });
  });

  describe(`when selecting ${EUR_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.EUR} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.EUR });
    });
  });

  describe('when selecting an alternate currency as the currency code', () => {
    it('should not display a prefix', () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
      cy.assertPrefix({ fieldId });
    });
  });
};

export default prefixAssertions;
