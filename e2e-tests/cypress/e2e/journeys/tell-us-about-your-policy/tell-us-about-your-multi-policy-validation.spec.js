import {
  completeAndSubmitBuyerForm,
  completeAndSubmitCompanyForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
} from '../../../support/forms';
import { tellUsAboutYourPolicyPage } from '../../pages';
import partials from '../../partials';
import { ERROR_MESSAGES } from '../../../../content-strings';
import CONSTANTS from '../../../../constants';
import checkText from '../../helpers/check-text';

const { FIELD_IDS } = CONSTANTS;

context('Tell us your multi policy you need - form validation', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerForm();
      completeAndSubmitCompanyForm();
      completeAndSubmitUkContentForm();
      completeAndSubmitPolicyTypeMultiForm();
    });

    beforeEach(() => {
      tellUsAboutYourPolicyPage.submitButton().click();
    });

    it.only('should render validation errors for all required fields', () => {
      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY}`,
      );

      // max amount owed
      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].IS_EMPTY}`,
      );

      // percentage of cover
      checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY}`,
      );

      // credit period
      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY}`,
      );
    });

    it('should focus on inputs when clicking summary error message', () => {
      // currency
      partials.errorSummaryListItemLinks().eq(0).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().should('have.focus');

      // max amount owed
      partials.errorSummaryListItemLinks().eq(1).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().should('have.focus');

      // perecentage of cover
      partials.errorSummaryListItemLinks().eq(2).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().should('have.focus');

      // credit period
      partials.errorSummaryListItemLinks().eq(3).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().should('have.focus');
    });
  });

  describe('when `max amount owed` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('a');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` is not a whole number', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('1234.56');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('0');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` has a non-numeric value', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('a');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `credit period` contains a decimal', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().type('1.2');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `credit period` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().clear().type('0');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` has a value above the maximum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].input().clear().type('3');
      tellUsAboutYourPolicyPage.submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].ABOVE_MAXIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].ABOVE_MAXIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('GBP');
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('10');

      tellUsAboutYourPolicyPage.submitButton().click();

      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains('GBP');

      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input()
        .should('have.attr', 'value', '10');
    });
  });
});
