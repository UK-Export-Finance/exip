import { field as fieldSelector } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';
import SPECIAL_CHARACTERS from '../../../../../../../fixtures/special-characters';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, BUYER_FINANCIAL_INFORMATION },
} = INSURANCE_ROUTES;

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

const submitAndAssertBothFields = ({
  value = null, errorTotalOutstanding, errorAmountOverdue, expectedValue, assertExpectedValue,
}) => {
  const expectedErrorsCount = 2;

  cy.submitAndAssertFieldErrors({
    field: fieldSelector(TOTAL_OUTSTANDING_PAYMENTS),
    value,
    expectedErrorsCount,
    expectedErrorMessage: errorTotalOutstanding,
    expectedValue,
    assertExpectedValue,
  });

  cy.submitAndAssertFieldErrors({
    field: fieldSelector(TOTAL_AMOUNT_OVERDUE),
    value,
    errorIndex: 1,
    expectedErrorsCount,
    expectedErrorMessage: errorAmountOverdue,
    expectedValue,
    assertExpectedValue,
  });
};

context('Insurance - Your Buyer - Trading history page - Outstanding payments yes validation', () => {
  let referenceNumber;
  let url;
  let buyerFinancialInformationUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      buyerFinancialInformationUrl = `${baseUrl}${ROOT}/${referenceNumber}${BUYER_FINANCIAL_INFORMATION}`;

      cy.startInsuranceYourBuyerSection({});
      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionWithTheBuyerForm({});
      cy.completeAndSubmitTradedWithBuyerForm({ exporterHasTradedWithBuyer: true });

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when leaving ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS} empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].IS_EMPTY,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].IS_EMPTY,
      });
    });
  });

  describe(`when entering a value which is not a number for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        value: 'ten',
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT,
      });
    });
  });

  describe(`when entering a value with a decimal place for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        value: '5.5',
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT,
      });
    });
  });

  describe(`when entering a value with a comma and decimal place for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        value: '1,250.5',
        expectedValue: '1,250.5',
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT,
      });
    });
  });

  describe(`when entering a value below the minimum for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        value: '0',
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].BELOW_MINIMUM,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].BELOW_MINIMUM,
      });
    });
  });

  describe(`when entering a value with special characters for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields({
        value: SPECIAL_CHARACTERS,
        errorTotalOutstanding: ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT,
        errorAmountOverdue: ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT,
      });
    });
  });

  describe(`when entering valid values for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${BUYER_FINANCIAL_INFORMATION} page`, () => {
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      cy.assertUrl(buyerFinancialInformationUrl);
    });
  });
});
