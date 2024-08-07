import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY },
} = INSURANCE_ROUTES;

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Trading history page - Currency symbol when changing currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
    cy.navigateToUrl(url);
    // click outstanding payments radio
    cy.clickYesRadioInput();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`prefixes should be displayed based on the chosen currency for ${TOTAL_AMOUNT_OVERDUE}`, () => {
    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: TOTAL_AMOUNT_OVERDUE });

    prefixAssertions();
  });

  describe(`prefixes should be displayed based on the chosen currency for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    before(() => {
      cy.saveSession();
      cy.navigateToUrl(url);
      // click outstanding payments radio
      cy.clickYesRadioInput();
      // change to GBP
      cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: GBP_CURRENCY_CODE });
    });

    const { prefixAssertions } = assertCurrencyFormFields({ fieldId: TOTAL_OUTSTANDING_PAYMENTS });

    prefixAssertions();
  });
});
