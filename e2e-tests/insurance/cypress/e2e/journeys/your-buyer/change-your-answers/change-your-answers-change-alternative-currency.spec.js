import { INSURANCE_FIELD_IDS } from '../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../content-strings/fields/insurance/your-buyer';
import { field, summaryList } from '../../../../../../pages/shared';
import application from '../../../../../../fixtures/application';
import formatCurrency from '../../../../../../helpers/format-currency';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME, SYMBOLS } from '../../../../../../fixtures/currencies';

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  YOUR_BUYER: { CURRENCY_OF_LATE_PAYMENTS_CHANGE, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Your buyer - Change your answers - Alternative currency - As an exporter, I want to change my answers to an alternative currency', () => {
  let referenceNumber;
  let url;
  const currencyFieldId = CURRENCY_CODE;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completeAndSubmitYourBuyerForms({ formToStopAt: 'buyerFinancialInformation', exporterHasTradedWithBuyer: true, outstandingPayments: true });

      url = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`changing ${CURRENCY_CODE} to ${SYMBOLS.EUR}`, () => {
    const currencyCode = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CURRENCY_OF_LATE_PAYMENTS_CHANGE, fieldId: currencyFieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.completeAndSubmitCurrencyForm({ isoCode: EUR_CURRENCY_CODE });
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: currencyFieldId });
      });

      it(`should render the new answer for ${CURRENCY_CODE} including ${SYMBOLS.EUR}`, () => {
        const row = summaryList.field(CURRENCY_CODE);

        cy.checkText(row.value(), currencyCode);
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE} including ${SYMBOLS.EUR}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS} including ${SYMBOLS.EUR}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });
    });
  });

  describe(`changing ${CURRENCY_CODE} to an alternative currency`, () => {
    const currencyCode = NON_STANDARD_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CURRENCY_OF_LATE_PAYMENTS_CHANGE, fieldId: currencyFieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.completeAndSubmitCurrencyForm({ alternativeCurrency: true });
        cy.clickSubmitButton();
      });

      it(`should redirect to ${CHECK_YOUR_ANSWERS}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CHECK_YOUR_ANSWERS, fieldId: currencyFieldId });
      });

      it(`should render the new answer for ${CURRENCY_CODE}`, () => {
        const row = summaryList.field(CURRENCY_CODE);

        cy.checkText(row.value(), currencyCode);
      });

      it(`should render the new answer for ${TOTAL_AMOUNT_OVERDUE}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it(`should render the new answer for ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
        const row = summaryList.field(TOTAL_OUTSTANDING_PAYMENTS);
        const expected = formatCurrency(application.BUYER[TOTAL_OUTSTANDING_PAYMENTS], currencyCode);

        cy.checkText(row.value(), expected);
      });

      it(`should render the ${TOTAL_AMOUNT_OVERDUE} answer with the alternative currency on the outstanding or overdue payments page`, () => {
        const fieldId = TOTAL_AMOUNT_OVERDUE;

        summaryList.field(fieldId).changeLink().click();

        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[fieldId].LABEL,
          currencyName: NON_STANDARD_CURRENCY_NAME,
          selector: field(fieldId).label(),
        });
      });

      it(`should render the ${TOTAL_OUTSTANDING_PAYMENTS} answer with the alternative currency on the outstanding or overdue payments page`, () => {
        const fieldId = TOTAL_OUTSTANDING_PAYMENTS;

        summaryList.field(fieldId).changeLink().click();

        cy.assertCopyWithCurrencyName({
          expectedCopy: FIELDS[fieldId].LABEL,
          currencyName: NON_STANDARD_CURRENCY_NAME,
          selector: field(fieldId).label(),
        });
      });
    });
  });
});
