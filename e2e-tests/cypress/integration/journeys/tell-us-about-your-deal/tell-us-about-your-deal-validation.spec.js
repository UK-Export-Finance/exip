import tellUsAboutYourDealPage from '../../pages/tellUsAboutYourDeal';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import checkText from '../../helpers/check-text';

const { ROUTES, FIELD_IDS } = CONSTANTS;

context('Tell us about your deal page - form validation', () => {
  beforeEach(() => {
    cy.visit(ROUTES.TELL_US_ABOUT_YOUR_DEAL, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    it('should render validation errors for all required fields', () => {
      tellUsAboutYourDealPage.submitButton().click();

      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY}`,
      );

      // amount
      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].IS_EMPTY}`,
      );

      // credit period
      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY}`,
      );

      // policy type
      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE],
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.POLICY_TYPE]}`,
      );
    });
  });

  describe('when `amount` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `amount` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('0');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.AMOUNT].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `credit period` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('0');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when (optional field) `pre-credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('a');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when (optional field) `pre-credit period` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('-1');
      tellUsAboutYourDealPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.PRE_CREDIT_PERIOD].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].input().select('AED');
      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input().type('10');
      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input().type('1');
      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input().type('2');
      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().click();

      tellUsAboutYourDealPage.submitButton().click();

      tellUsAboutYourDealPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains('AED');

      tellUsAboutYourDealPage[FIELD_IDS.AMOUNT].input()
        .should('have.attr', 'value', '10');

      tellUsAboutYourDealPage[FIELD_IDS.PRE_CREDIT_PERIOD].input()
        .should('have.attr', 'value', '1');

      tellUsAboutYourDealPage[FIELD_IDS.CREDIT_PERIOD].input()
        .should('have.attr', 'value', '2');

      tellUsAboutYourDealPage[FIELD_IDS.POLICY_TYPE].single.input().should('be.checked');
    });
  });
});
