import { yesRadioInput, field } from '../../../../../../../pages/shared';
import { ERROR_MESSAGES } from '../../../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../../../constants/routes/insurance';
import { YOUR_BUYER as FIELD_IDS } from '../../../../../../../constants/field-ids/insurance/your-buyer';

const {
  ROOT,
  YOUR_BUYER: { TRADING_HISTORY, CHECK_YOUR_ANSWERS },
} = INSURANCE_ROUTES;

const { TOTAL_OUTSTANDING, AMOUNT_OVERDUE } = FIELD_IDS;

const {
  INSURANCE: {
    YOUR_BUYER: ERRORS,
  },
} = ERROR_MESSAGES;

const baseUrl = Cypress.config('baseUrl');

const submitAndAssertBothFields = (value, errorTotalOutstanding, errorAmountOverdue) => {
  const expectedErrorsCount = 2;

  cy.submitAndAssertFieldErrors(
    field(TOTAL_OUTSTANDING),
    value,
    0,
    expectedErrorsCount,
    errorTotalOutstanding,
  );

  cy.submitAndAssertFieldErrors(
    field(AMOUNT_OVERDUE),
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

      // TODO: EMS-2659 - use buyer commands to get here
      cy.navigateToUrl(url);

      cy.assertUrl(url);
    });
  });

  beforeEach(() => {
    cy.saveSession();
  });

  after(() => {
    cy.deleteApplication(referenceNumber);
  });

  describe(`when leaving ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING} empty`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      submitAndAssertBothFields(null, ERRORS[TOTAL_OUTSTANDING].IS_EMPTY, ERRORS[AMOUNT_OVERDUE].IS_EMPTY);
    });
  });

  describe(`when entering a value which is not a number for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      const value = 'ten';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING].INCORRECT_FORMAT, ERRORS[AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value with a decimal place for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      const value = 5.5;

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING].INCORRECT_FORMAT, ERRORS[AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value with a comma and decimal place for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      const value = '1,250.5';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING].INCORRECT_FORMAT, ERRORS[AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering a value below the minimum for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      const value = '0';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING].BELOW_MINIMUM, ERRORS[AMOUNT_OVERDUE].BELOW_MINIMUM);
    });
  });

  describe(`when entering a value with a special character for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
      yesRadioInput().first().click();
      yesRadioInput().eq(1).click();
    });

    it('should render validation errors', () => {
      const value = '5*';

      submitAndAssertBothFields(value, ERRORS[TOTAL_OUTSTANDING].INCORRECT_FORMAT, ERRORS[AMOUNT_OVERDUE].INCORRECT_FORMAT);
    });
  });

  describe(`when entering valid values  for ${AMOUNT_OVERDUE} and ${TOTAL_OUTSTANDING}`, () => {
    beforeEach(() => {
      cy.navigateToUrl(url);
    });

    it(`should redirect to ${CHECK_YOUR_ANSWERS} page`, () => {
      cy.completeAndSubmitTradingHistoryWithBuyerForm({ outstandingPayments: true });
      cy.assertUrl(checkYourAnswersUrl);
    });
  });
});
