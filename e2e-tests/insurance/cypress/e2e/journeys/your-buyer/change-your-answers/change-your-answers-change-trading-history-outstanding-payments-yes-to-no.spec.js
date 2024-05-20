import { field, summaryList } from '../../../../../../pages/shared';
import { FIELD_VALUES } from '../../../../../../constants';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';

const {
  OUTSTANDING_PAYMENTS,
  TOTAL_AMOUNT_OVERDUE,
  TOTAL_OUTSTANDING_PAYMENTS,
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY,
    TRADING_HISTORY_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const fieldId = OUTSTANDING_PAYMENTS;

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your buyer - Change your answers - Trading history - ${OUTSTANDING_PAYMENTS} - Yes to no - As an exporter, I want to change my answers to the trading history section`, () => {
  let referenceNumber;
  let url;
  let tradingHistoryUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
      tradingHistoryUrl = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${TRADING_HISTORY_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADING_HISTORY_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: false });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it(`should render the new answer with no ${TOTAL_AMOUNT_OVERDUE} or ${TOTAL_OUTSTANDING_PAYMENTS} rows`, () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
    });

    describe(`when going back to ${TRADING_HISTORY}`, () => {
      it(`should have the submitted 'no' value and empty ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS} values`, () => {
        cy.navigateToUrl(tradingHistoryUrl);

        cy.assertNoRadioOptionIsChecked();

        cy.clickYesRadioInput();

        cy.checkValue(field(TOTAL_AMOUNT_OVERDUE), '');
        cy.checkValue(field(TOTAL_OUTSTANDING_PAYMENTS), '');
      });
    });
  });
});
