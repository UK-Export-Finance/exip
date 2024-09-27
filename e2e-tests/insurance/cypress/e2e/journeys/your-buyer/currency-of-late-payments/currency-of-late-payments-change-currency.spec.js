import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { CURRENCY_OF_LATE_PAYMENTS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your business - Turnover currency page - As an Exporter I want to change the currency of my annual turnover', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      // go to the page we want to test.
      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'tradingHistoryWithBuyer', outstandingPayments: true, exporterHasTradedWithBuyer: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`prefixes should be displayed based on the chosen currency for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: TOTAL_OUTSTANDING_PAYMENTS });

    prefixAssertions();
  });

  describe(`prefixes should be displayed based on the chosen currency for ${TOTAL_AMOUNT_OVERDUE}`, () => {
    before(() => {
      cy.saveSession();
      cy.navigateToUrl(url);
      // change to GBP
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: GBP_CURRENCY_CODE });
    });

    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: TOTAL_AMOUNT_OVERDUE });

    prefixAssertions();
  });
});
