import { field, status, summaryList } from '../../../../../../../pages/shared';
import { INSURANCE_FIELD_IDS } from '../../../../../../../constants/field-ids/insurance';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER_FIELDS as FIELDS } from '../../../../../../../content-strings/fields/insurance/your-buyer';
import application from '../../../../../../../fixtures/application';
import formatCurrency from '../../../../../../../helpers/format-currency';
import { EUR_CURRENCY_CODE, NON_STANDARD_CURRENCY_CODE, NON_STANDARD_CURRENCY_NAME, SYMBOLS } from '../../../../../../../fixtures/currencies';

const {
  CURRENCY: { CURRENCY_CODE },
  YOUR_BUYER: { TOTAL_AMOUNT_OVERDUE, TOTAL_OUTSTANDING_PAYMENTS },
} = INSURANCE_FIELD_IDS;

const {
  ROOT,
  CHECK_YOUR_ANSWERS: { YOUR_BUYER },
  YOUR_BUYER: { CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE },
} = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Check your answers - Your buyer - Alternative currency - As an exporter, I want to change my answers to an alternative currency', () => {
  let referenceNumber;
  let url;
  const currencyFieldId = CURRENCY_CODE;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.completePrepareApplicationSinglePolicyType({
        referenceNumber,
        exporterHasTradedWithBuyer: true,
        fullyPopulatedBuyerTradingHistory: true,
      });

      cy.clickTaskCheckAnswers();

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

  describe(`changing ${CURRENCY_CODE} to ${SYMBOLS.EUR}`, () => {
    const currencyCode = EUR_CURRENCY_CODE;

    describe('when clicking the `change` link', () => {
      it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE, fieldId: currencyFieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ isoCode: EUR_CURRENCY_CODE });

        cy.clickSubmitButton();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId: currencyFieldId });
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
      it(`should redirect to ${CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE}`, () => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.assertChangeAnswersPageUrl({ referenceNumber, route: CURRENCY_OF_LATE_PAYMENTS_CHECK_AND_CHANGE, fieldId: currencyFieldId });
      });
    });

    describe('form submission with a new answer', () => {
      beforeEach(() => {
        cy.navigateToUrl(url);

        summaryList.field(currencyFieldId).changeLink().click();

        cy.completeAndSubmitAlternativeCurrencyForm({ alternativeCurrency: true });

        cy.clickSubmitButton();
      });

      it(`should redirect to ${YOUR_BUYER}`, () => {
        cy.assertChangeAnswersPageUrl({ referenceNumber, route: YOUR_BUYER, fieldId: currencyFieldId });
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

      it('should retain a `completed` status tag', () => {
        cy.checkTaskStatusCompleted(status);
      });
    });
  });
});
