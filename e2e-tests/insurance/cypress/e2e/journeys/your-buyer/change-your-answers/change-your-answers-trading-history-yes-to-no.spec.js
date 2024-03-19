import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';

const {
  YOUR_BUYER: {
    TRADED_WITH_BUYER,
    OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    TOTAL_OUTSTANDING_PAYMENTS,
    FAILED_PAYMENTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Trading history - As an exporter, I want to change my answers to the trading history section from yes to no', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true, failedToPay: true });
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  const fieldId = TRADED_WITH_BUYER;

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradedWithBuyerForm({});
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it('should render the new answer and not render option rows', () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
      cy.assertSummaryListRowDoesNotExist(summaryList, FAILED_PAYMENTS);
      cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      cy.assertSummaryListRowDoesNotExist(summaryList, OUTSTANDING_PAYMENTS);
    });
  });
});
