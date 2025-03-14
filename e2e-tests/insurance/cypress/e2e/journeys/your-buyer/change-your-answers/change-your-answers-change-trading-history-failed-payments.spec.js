import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';

const { FAILED_PAYMENTS } = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { FAILED_TO_PAY_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const fieldId = FAILED_PAYMENTS;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Your buyer - Change your answers - Trading history - ${FAILED_PAYMENTS} - As an exporter, I want to change my answers to the trading history section`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBuyerForms({ stopSubmittingAfter: 'buyerFinancialInformation', exporterHasTradedWithBuyer: true, failedToPay: true });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${FAILED_TO_PAY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: FAILED_TO_PAY_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitFailedToPayForm({ failedToPay: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${FAILED_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });
    });
  },
);
