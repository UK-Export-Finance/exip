import { headingCaption, yesRadio, yesNoRadioHint, noRadio } from '../../../../../../pages/shared';
import { PAGES } from '../../../../../../content-strings';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';

const CONTENT_STRINGS = PAGES.INSURANCE.YOUR_BUYER.FAILED_PAYMENTS;

const {
  ROOT,
  YOUR_BUYER: { OUTSTANDING_OR_OVERDUE_PAYMENTS, FAILED_TO_PAY, BUYER_FINANCIAL_INFORMATION },
} = INSURANCE_ROUTES;

const { FAILED_PAYMENTS: FIELD_ID } = FIELD_IDS;

const baseUrl = Cypress.config('baseUrl');

context(
  "Insurance - Your buyer - Failed to pay on time page - As an Underwriter, I want to know whether the buyer has ever failed to pay me on time, So that I have accurate information about the buyer's previous behaviour when assessing the application",
  () => {
    let referenceNumber;
    let url;
    let buyerFinancialInformationUrl;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        url = `${baseUrl}${ROOT}/${referenceNumber}${FAILED_TO_PAY}`;
        buyerFinancialInformationUrl = `${baseUrl}${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

        cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'outstandingOrOverduePayments', exporterHasTradedWithBuyer: true, outstandingPayments: true });

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
        currentHref: `${ROOT}/${referenceNumber}${FAILED_TO_PAY}`,
        backLink: `${ROOT}/${referenceNumber}${OUTSTANDING_OR_OVERDUE_PAYMENTS}`,
      });
    });

    describe('page tests', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);
      });

      it('renders a heading caption', () => {
        cy.checkText(headingCaption(), CONTENT_STRINGS.HEADING_CAPTION);
      });

      it('renders `yes` radio button', () => {
        yesRadio().input().first().should('exist');

        cy.checkText(yesRadio().label().first(), FIELD_VALUES.YES);

        cy.checkText(yesNoRadioHint(), FIELDS[FIELD_ID].HINT);
      });

      it('renders `no` radio button', () => {
        noRadio().input().first().should('exist');

        cy.checkText(noRadio().label().first(), FIELD_VALUES.NO);
      });

      it('renders `yes` and `no` radio buttons in the correct order', () => {
        cy.assertYesNoRadiosOrder({ noRadioFirst: true });
      });
    });

    describe('form submission', () => {
      describe('when submitting a fully filled form', () => {
        describe(`when ${FIELD_ID} is "no"`, () => {
          it(`should redirect to ${FAILED_TO_PAY} page`, () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitFailedToPayForm({});

            cy.assertUrl(buyerFinancialInformationUrl);
          });

          describe('when going back to the page', () => {
            it('should have the submitted values', () => {
              cy.navigateToUrl(url);

              cy.assertNoRadioOptionIsChecked();
            });
          });
        });

        describe(`when ${FIELD_ID} is "yes"`, () => {
          it(`should redirect to ${FIELD_ID} page`, () => {
            cy.navigateToUrl(url);

            cy.completeAndSubmitFailedToPayForm({ failedToPay: true });

            cy.assertUrl(buyerFinancialInformationUrl);
          });

          describe('when going back to the page', () => {
            it('should have the submitted values', () => {
              cy.navigateToUrl(url);

              cy.assertYesRadioOptionIsChecked();
            });
          });
        });
      });
    });
  },
);
