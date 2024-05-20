import { summaryList } from '../../../../../../../pages/shared';
import partials from '../../../../../../../partials';
import { FIELD_VALUES } from '../../../../../../../constants';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import application from '../../../../../../../fixtures/application';
import formatCurrency from '../../../../../../../helpers/format-currency';

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
  CHECK_YOUR_ANSWERS: {
    YOUR_BUYER,
  },
  YOUR_BUYER: {
    TRADING_HISTORY_CHECK_AND_CHANGE,
  },
} = INSURANCE_ROUTES;

const { taskList } = partials.insurancePartials;

const task = taskList.submitApplication.tasks.checkAnswers;

const fieldId = OUTSTANDING_PAYMENTS;
const currency = application.BUYER[CURRENCY_CODE];

const baseUrl = Cypress.config('baseUrl');

context(`Insurance - Check your answers - Trading history - ${OUTSTANDING_PAYMENTS} - Yes to no - As an exporter, I want to change my answers to the trading history section`, () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        fullyPopulatedBuyerTradingHistory: true,
      });

      task.link().click();

      // To get past "Your business" check your answers page
      cy.completeAndSubmitMultipleCheckYourAnswers({ count: 1 });

      url = `${baseUrl}${ROOT}/${referenceNumber}${YOUR_BUYER}`;

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe('when clicking the `change` link', () => {
    it(`should redirect to ${TRADING_HISTORY_CHECK_AND_CHANGE}`, () => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADING_HISTORY_CHECK_AND_CHANGE, fieldId });
    });
  });

  describe('form submission with a new answer', () => {
    beforeEach(() => {
      cy.navigateToUrl(url);

      summaryList.field(fieldId).changeLink().click();

      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: false });
    });

    it(`should redirect to ${YOUR_BUYER}`, () => {
      cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId });
    });

    // TODO: 2 fields are in the UI, need to test both
    it(`should render the new answer with ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
      cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);

      const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
      const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

      row.value().contains(expected);
    });
  });
});
