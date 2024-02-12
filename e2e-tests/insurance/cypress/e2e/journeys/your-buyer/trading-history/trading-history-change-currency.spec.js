import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import {
  SYMBOLS, USD_CURRENCY_CODE, EUR_CURRENCY_CODE, JPY_CURRENCY_CODE,
} from '../../../../../../fixtures/currencies';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY },
} = INSURANCE_ROUTES;

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your Buyer - Trading history page - Currency symbol when changing currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

      // TODO: EMS-2659 - use buyer commands to get here
      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
    // press outstanding payments radio
    cy.clickYesRadioInput();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when not selecting a currency', () => {
    it(`should display ${SYMBOLS.GBP} as the prefix`, () => {
      cy.assertPrefix({ fieldId: TOTAL_OUTSTANDING_PAYMENTS, value: SYMBOLS.GBP });
      cy.assertPrefix({ fieldId: TOTAL_AMOUNT_OVERDUE, value: SYMBOLS.GBP });
    });
  });

  describe(`when selecting ${USD_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.USD} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: USD_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: TOTAL_OUTSTANDING_PAYMENTS, value: SYMBOLS.USD });
      cy.assertPrefix({ fieldId: TOTAL_AMOUNT_OVERDUE, value: SYMBOLS.USD });
    });
  });

  describe(`when selecting ${JPY_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.JPY} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: JPY_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: TOTAL_OUTSTANDING_PAYMENTS, value: SYMBOLS.JPY });
      cy.assertPrefix({ fieldId: TOTAL_AMOUNT_OVERDUE, value: SYMBOLS.JPY });
    });
  });

  describe(`when selecting ${EUR_CURRENCY_CODE} as the currency code`, () => {
    it(`should display ${SYMBOLS.EUR} as the prefix`, () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
      cy.assertPrefix({ fieldId: TOTAL_OUTSTANDING_PAYMENTS, value: SYMBOLS.EUR });
      cy.assertPrefix({ fieldId: TOTAL_AMOUNT_OVERDUE, value: SYMBOLS.EUR });
    });
  });

  describe('when selecting an alternate currency as the currency code', () => {
    it('should not display a prefix', () => {
      cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
    });
  });
});
