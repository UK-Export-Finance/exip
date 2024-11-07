import { summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const { TRADED_WITH_BUYER, OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS, FAILED_PAYMENTS } = FIELD_IDS;
const { CURRENCY_CODE } = INSURANCE_FIELD_IDS.CURRENCY;

const {
  ROOT,
  YOUR_BUYER: { CHECK_YOUR_ANSWERS, TRADING_HISTORY },
} = INSURANCE_ROUTES;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context(
  `Insurance - Your buyer - Change your answers - ${TRADED_WITH_BUYER} - Yes to no - As an exporter, I want to change my answers to the traded with buyer section from yes to no`,
  () => {
    let referenceNumber;
    let url;

    before(() => {
      cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
        referenceNumber = refNumber;

        cy.completeAndSubmitYourBuyerForms({
          stopSubmittingAfter: 'buyerFinancialInformation',
          exporterHasTradedWithBuyer: true,
          outstandingPayments: true,
          failedToPay: true,
        });

        url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      });
    });

    beforeEach(() => {
      cy.saveSession();

      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: false });
    });

    after(() => {
      cy.deleteApplication(referenceNumber);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render the new answer, with no other trading history fields', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
      cy.assertSummaryListRowDoesNotExist(summaryList, FAILED_PAYMENTS);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      cy.assertSummaryListRowDoesNotExist(summaryList, OUTSTANDING_PAYMENTS);
      cy.assertSummaryListRowDoesNotExist(summaryList, CURRENCY_CODE);
    });

    describe(`when changing the answer again from no to yes and going back to ${TRADING_HISTORY}`, () => {
      it('should have empty field values', () => {
        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

        cy.assertNoRadioOptionIsNotChecked(0);
        cy.assertYesRadioOptionIsNotChecked(0);

        cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
        cy.clickSubmitButton();

        cy.assertEmptyOverdueOrOutstandingFieldValues();
      });
    });
  },
);
