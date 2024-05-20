import { YOUR_BUYER as FIELD_IDS } from '../../../../../../constants/field-ids/insurance/your-buyer';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';
import checkSummaryList from '../../../../../../commands/insurance/check-your-buyer-summary-list';

const {
  TRADED_WITH_BUYER,
  OUTSTANDING_PAYMENTS,
  FAILED_PAYMENTS,
  HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
  PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER,
} = FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const fieldId = TRADED_WITH_BUYER;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Trading history - No to yes - As an exporter, I want to change my answers to the trading history section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: false });
      cy.completeAndSubmitBuyerFinancialInformationForm({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  it(`should redirect to ${TRADING_HISTORY_CHANGE} and then ${CHECK_YOUR_ANSWERS} after completing (now required) ${TRADING_HISTORY_CHANGE} fields`, () => {
    summaryList.field(fieldId).changeLink().click();

    cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
    cy.completeAndSubmitTradingHistoryWithBuyerForm({});

    cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
  });

  it('should render the new answers', () => {
    checkSummaryList[TRADED_WITH_BUYER]({ shouldRender: true, isYes: true });
    checkSummaryList[OUTSTANDING_PAYMENTS]({ shouldRender: true, isYes: false });
    checkSummaryList[FAILED_PAYMENTS]({ shouldRender: true, isYes: false });
    checkSummaryList[HAS_PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
    checkSummaryList[PREVIOUS_CREDIT_INSURANCE_COVER_WITH_BUYER]({ shouldRender: false });
  });
});
