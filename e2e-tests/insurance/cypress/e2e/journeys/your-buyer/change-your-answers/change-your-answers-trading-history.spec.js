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
    TRADED_WITH_BUYER_CHANGE,
    TRADING_HISTORY_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Trading history - As an exporter, I want to change my answers to the trading history section', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({});
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

  describe(TRADED_WITH_BUYER, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADED_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADED_WITH_BUYER_CHANGE, fieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it('should render the new answer', () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });
    });
  });

  describe(`changing ${OUTSTANDING_PAYMENTS} from no to yes`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currency = application.BUYER[CURRENCY_CODE];

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

      it(`should render the new answer for ${OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        row.value().contains(expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        row.value().contains(expected);
      });
    });
  });

  describe(`changing ${OUTSTANDING_PAYMENTS} from yes to no`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;

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

        cy.completeAndSubmitTradingHistoryWithBuyerForm({});
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.NO);
      });

      it(`should not render a value for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_AMOUNT_OVERDUE);
      });

      it(`should not render a value for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        cy.assertSummaryListRowDoesNotExist(summaryList, TOTAL_OUTSTANDING_PAYMENTS);
      });
    });
  });

  describe(FAILED_PAYMENTS, () => {
    const fieldId = FAILED_PAYMENTS;

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

        cy.completeAndSubmitTradingHistoryWithBuyerForm({ failedToPay: true });
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId });
      });

      it(`should render the new answer for ${FAILED_PAYMENTS}`, () => {
        cy.assertSummaryListRowValue(summaryList, fieldId, FIELD_VALUES.YES);
      });
    });
  });

  describe(`changing ${TRADED_WITH_BUYER} from yes to no`, () => {
    const fieldId = TRADED_WITH_BUYER;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${TRADED_WITH_BUYER_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(OUTSTANDING_PAYMENTS).changeLink().click();
        cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true, failedToPay: true });

        summaryList.field(fieldId).changeLink().click();
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: TRADED_WITH_BUYER_CHANGE, fieldId });
      });
    });

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
});
