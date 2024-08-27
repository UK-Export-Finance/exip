import { headingCaption, field } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import application from '../../../../../../fixtures/application';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.OUTSTANDING_OR_OVERDUE_PAYMENTS;

const {
  ROOT,
  YOUR_BUYER: { OUTSTANDING_OR_OVERDUE_PAYMENTS, FAILED_TO_PAY, CURRENCY_OF_LATE_PAYMENTS, TRADING_HISTORY },
} = INSURANCE_ROUTES;

const { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS, OUTSTANDING_PAYMENTS } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

const { BUYER } = application;

context('Insurance - Your buyer - Outstanding or overdue payments', () => {
  let referenceNumber;
  let url;
  let failedToPayUrl;
  let tradingHistoryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`;
      failedToPayUrl = `${baseUrl}${ROOT}/${referenceNumber}${FAILED_TO_PAY}`;
      tradingHistoryUrl = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;

      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'currencyOfLatePayments', outstandingPayments: true, exporterHasTradedWithBuyer: true });

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
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: `${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`,
      backLink: `${ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it('renders a heading caption', () => {
      cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
    });

    describe(TOTAL_OUTSTANDING_PAYMENTS, () => {
      it(`should render a label for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        cy.checkText(field(TOTAL_OUTSTANDING_PAYMENTS).label(), FIELDS[TOTAL_OUTSTANDING_PAYMENTS].LABEL);
      });

      it(`should render an input for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        field(TOTAL_OUTSTANDING_PAYMENTS).input().should('be.visible');
      });
    });

    describe(TOTAL_AMOUNT_OVERDUE, () => {
      it(`should render a label for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        cy.checkText(field(TOTAL_AMOUNT_OVERDUE).label(), FIELDS[TOTAL_AMOUNT_OVERDUE].LABEL);
      });

      it(`should render an input for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        field(TOTAL_AMOUNT_OVERDUE).input().should('be.visible');
      });
    });
  });

  describe('form submission', () => {
    describe('when submitting a fully filled form', () => {
      it(`should redirect to ${FAILED_TO_PAY} page`, () => {
        cy.navigateToUrl(url);

        cy.completeAndSubmitOutstandingOrOverduePaymentsForm({});

        cy.assertUrl(failedToPayUrl);
      });

      describe('when going back to the page', () => {
        it('should have the submitted values', () => {
          cy.navigateToUrl(url);

          cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), BUYER[TOTAL_OUTSTANDING_PAYMENTS]);
          cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), BUYER[TOTAL_AMOUNT_OVERDUE]);
        });
      });

      describe(`changing ${OUTSTANDING_PAYMENTS} from "yes" to "no"`, () => {
        beforeEach(() => {
          cy.navigateToUrl(tradingHistoryUrl);

          // submit OUTSTANDING_PAYMENTS as yes
          cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });

          cy.navigateToUrl(tradingHistoryUrl);

          // change OUTSTANDING_PAYMENTS to no
          cy.completeAndSubmitTradingHistoryWithBuyerForm({});
        });

        describe('when going back to the page', () => {
          it(`should have the submitted values and have removed data from ${TOTAL_OUTSTANDING_PAYMENTS} and ${TOTAL_AMOUNT_OVERDUE}`, () => {
            cy.navigateToUrl(url);

            cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
            cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
          });
        });
      });
    });
  });
});
