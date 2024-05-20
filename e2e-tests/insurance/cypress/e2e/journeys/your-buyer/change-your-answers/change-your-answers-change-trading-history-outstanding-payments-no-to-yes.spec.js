import { FIELD_VALUES } from '../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';
import formatCurrency from '../../../../../../helpers/format-currency';

const {
  CURRENCY: {
    CURRENCY_CODE,
  },
  YOUR_BUYER: {
    OUTSTANDING_PAYMENTS,
    TOTAL_OUTSTANDING_PAYMENTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    TRADING_HISTORY_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const fieldId = OUTSTANDING_PAYMENTS;
const currency = application.BUYER[CURRENCY_CODE];

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Your buyer - Change your answers - Trading history - ${OUTSTANDING_PAYMENTS} - No to yes - As an exporter, I want to change my answers to the trading history section`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ fullyPopulatedBuyerTradingHistory: false });
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

      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
    });

    it(`should render the new answer with ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);

      const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
      const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

      row.value().contains(expected);
    });
  });
});
