import { field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { TOTAL_OUTSTANDING_PAYMENTS, TOTAL_AMOUNT_OVERDUE } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

const submitAndAssertBothFields = (value, errorTotalOutstanding, errorAmountOverdue) => {
  const expectedErrorsCount = 2;

  cy.submitAndAssertFieldErrors(
    field(TOTAL_OUTSTANDING_PAYMENTS),
    value,
    0,
    expectedErrorsCount,
    errorTotalOutstanding,
  );

  cy.submitAndAssertFieldErrors(
    field(TOTAL_AMOUNT_OVERDUE),
    value,
    1,
    expectedErrorsCount,
    errorAmountOverdue,
  );
};

context('Insurance - Your Buyer - Trading history page - Outstanding payments yes validation', () => {
  let referenceNumber;
  let url;
  let checkYourAnswersUrl;

  before(() => {
    cy.completeSignInAndGoToApplication({}).then(({ referenceNumber: refNumber }) => {
      referenceNumber = refNumber;

      cy.startInsuranceYourBuyerSection({});

      url = `${baseUrl}${ROOT}/${referenceNumber}${TRADING_HISTORY}`;
      checkYourAnswersUrl = `${baseUrl}${ROOT}/${referenceNumber}${CHECK_YOUR_ANSWERS}`;

      cy.completeAndSubmitCompanyOrOrganisationForm({});
      cy.completeAndSubmitConnectionToTheBuyerForm({});
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
      submitAndAssertBothFields(null, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].IS_EMPTY, ERRORS[TOTAL_AMOUNT_OVERDUE].IS_EMPTY);
    });
  });

  describe(`when entering a value which is not a number for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      const value = 'ten';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT, ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value with a decimal place for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      const value = 5.5;

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT, ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value with a comma and decimal place for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      const value = '1,250.5';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT, ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value below the minimum for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      const value = '0';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].BELOW_MINIMUM, ERRORS[TOTAL_AMOUNT_OVERDUE].BELOW_MINIMUM);
    });
  });

  describe(`when entering a value with a special character for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      cy.clickYesRadioInput();
      cy.clickYesRadioInput(1);
    });

    it('should render validation errors', () => {
      const value = '5*';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING_PAYMENTS].INCORRECT_FORMAT, ERRORS[TOTAL_AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering valid values  for ${TOTAL_AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING_PAYMENTS}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      cy.assertUrl(checkYourAnswersUrl);
    });
  });
});
