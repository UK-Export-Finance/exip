import { headingCaption, yesRadio, noRadio, yesNoRadioHint } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.TRADING_HISTORY;

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CURRENCY_OF_LATE_PAYMENTS, TRADED_WITH_BUYER, FAILED_TO_PAY },
} = INSURANCE_ROUTES;

const { OUTSTANDING_PAYMENTS } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  'Insurance - Your buyer - Trading history page - As an exporter, I want to provide the details on trading history with the buyer of my export trade, So that UKEF can gain clarity on whether I have trading history with the buyer as part of due diligence',
  () => {
    let referenceNumber;
    let url;
    let failedToPayUrl;
    let currencyOfLatePaymentsUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
        failedToPayUrl = `${baseUrl}${ROOT}/${referenceNumber}${FAILED_TO_PAY}`;
        currencyOfLatePaymentsUrl = `${baseUrl}${ROOT}/${referenceNumber}${CURRENCY_OF_LATE_PAYMENTS}`;

        cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'tradedWithBuyer', exporterHasTradedWithBuyer: true });

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
        currentHref: `${ROOT}/${referenceNumber}${TRADING_HISTORY}`,
        backLink: `${ROOT}/${referenceNumber}${TRADED_WITH_BUYER}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders a hint', () => {
        cy.checkText(yesNoRadioHint(), FIELDS[OUTSTANDING_PAYMENTS].HINT);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().first().should('exist');

        cy.checkText(yesRadio().label().first(), FIELD_VALUES.YES);
      });

      it('renders `no` radio button', () => {
        noRadio().input().first().should('exist');

        cy.checkText(noRadio().label().first(), FIELD_VALUES.NO);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });

      it('renders a `save and back` button', () => {
        cy.assertSaveAndBackButton();
      });
    });

    describe('form submission', () => {
      describe('when submitting a fully filled form', () => {
        describe(`when ${OUTSTANDING_PAYMENTS} is "no"`, () => {
          it(`should redirect to ${FAILED_TO_PAY} page`, () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitTradingHistoryWithBuyerForm({});

            cy.assertUrl(failedToPayUrl);
          });

          describe('when going back to the page', () => {
            it('should have the submitted values', () => {
              cy.navigateToUrl(url);

              cy.assertNoRadioOptionIsChecked();
            });
          });
        });

        describe(`when ${OUTSTANDING_PAYMENTS} is "yes"`, () => {
          it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS} page`, () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });

            cy.assertUrl(currencyOfLatePaymentsUrl);
          });

          describe('when going back to the page', () => {
            it('should have the submitted values', () => {
              cy.navigateToUrl(url);

              cy.assertYesRadioOptionIsChecked(0);
            });
          });
        });
      });
    });
  },
);
