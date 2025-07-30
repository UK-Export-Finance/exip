import { SYMBOLS, USD_CURRENCY_CODE, JPY_CURRENCY_CODE, EUR_CURRENCY_CODE } from '../../fixtures/currencies';

/**
 * prefixAssertions
 * Prefix assertions for currency form fields.
 * @param {string} fieldId: Field ID of input for prefix assertion
 * @returns {Function} Mocha describe block with assertions.
 */
const prefixAssertions = ({ fieldId }) => {
  describe('when not selecting a currency', () => {
    it(`should render ${SYMBOLS.GBP} as the prefix`, () => {
      cy.clickSubmitButton();

      cy.assertPrefix({ fieldId, value: SYMBOLS.GBP });
    });
  });

  describe(`when selecting ${USD_CURRENCY_CODE} as the currency code`, () => {
    it(`should render ${SYMBOLS.USD} as the prefix`, () => {
      cy.completeAndSubmitCurrencyForm({ isoCode: USD_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.USD });
    });
  });

  describe(`when selecting ${JPY_CURRENCY_CODE} as the currency code`, () => {
    it(`should render ${SYMBOLS.JPY} as the prefix`, () => {
      cy.completeAndSubmitCurrencyForm({ isoCode: JPY_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.JPY });
    });
  });

  describe(`when selecting ${EUR_CURRENCY_CODE} as the currency code`, () => {
    it(`should render ${SYMBOLS.EUR} as the prefix`, () => {
      cy.completeAndSubmitCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
      cy.assertPrefix({ fieldId, value: SYMBOLS.EUR });
    });
  });

  describe('when selecting an alternate currency as the currency code', () => {
    it('should not display a prefix', () => {
      cy.completeAndSubmitCurrencyForm({ alternativeCurrency: true });
      cy.assertPrefix({ fieldId });
    });
  });
};

export default prefixAssertions;
