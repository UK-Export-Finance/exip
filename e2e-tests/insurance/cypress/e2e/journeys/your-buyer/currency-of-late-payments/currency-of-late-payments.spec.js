import { headingCaption } from '../../../../../../pages/shared';
import { BUTTONS, ERROR_MESSAGES, PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { assertCurrencyFormFields } from '../../../../../../shared-test-assertions';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.ROOT;

const {
  ROOT,
  YOUR_BUYER: { CURRENCY_OF_LATE_PAYMENTS, TRADING_HISTORY, OUTSTANDING_OR_OVERDUE_PAYMENTS },
} = INSURANCE_ROUTES;

const {
  CURRENCY: { CURRENCY_CODE },
} = INSURANCE_FIELD_IDS;

const {
  INSURANCE: { YOUR_BUYER: ERRORS },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Currency of late payments - As an exporter, I want to be able to select an alternative currency when reporting any outstanding or overdue payments from the buyer, So that I can report accurate figures on my application',
  () => {
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
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it('renders core page elements', () => {
      cy.corePageChecks({
        pageTitle: YOUR_BUYER_FIELDS[CURRENCY_CODE].LEGEND,
        currentHref: `${ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`,
        backLink: `${ROOT}/${referenceNumber}${TRADING_HISTORY}`,
        submitButtonCopy: BUTTONS.CONTINUE,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });
    });

    describe('currency form fields', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      const { rendering, formSubmission } = assertCurrencyFormFields({
        errors: ERRORS,
        redirectUrl: OUTSTANDING_OR_OVERDUE_PAYMENTS,
      });

      rendering();

      formSubmission({}).executeTests();
    });
  },
);
