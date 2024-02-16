import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';
import formatCurrency from '../../../../../../helpers/format-currency';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE } from '../../../../../../fixtures/currencies';
import partials from '../../../../../../partials';

const {
  CURRENCY: {
    CURRENCY_CODE,
  },
  YOUR_BUYER: {
    OUTSTANDING_PAYMENTS,
    TOTAL_AMOUNT_OVERDUE,
    TOTAL_OUTSTANDING_PAYMENTS,
  },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: {
    ALTERNATIVE_CURRENCY_CHANGE,
    CHECK_YOUR_ANSWERS,
  },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Alternative currency - As an exporter, I want to change my answers to an alternative currency', () => {
  let referenceNumber;
  let url;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
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

  describe(`changing ${CURRENCY_CODE} to Euros`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currency = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_CURRENCY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();
        partials.provideAlternativeCurrencyLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_CURRENCY_CHANGE });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
        // submit trading-history page
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        cy.checkText(row.value(), expected);
      });
    });
  });

  describe(`changing ${CURRENCY_CODE} to an alternative currency`, () => {
    const fieldId = OUTSTANDING_PAYMENTS;
    const currency = NON_STANDARD_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${ALTERNATIVE_CURRENCY_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();
        partials.provideAlternativeCurrencyLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: ALTERNATIVE_CURRENCY_CHANGE });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(fieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });
        // submit trading-history page
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS });
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currency);

        cy.checkText(row.value(), expected);
      });
    });
  });
});
