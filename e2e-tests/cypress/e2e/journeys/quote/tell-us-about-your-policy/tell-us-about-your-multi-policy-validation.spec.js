import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeMultiForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../pages/quote';
import partials from '../../../partials';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

context('Tell us about the multi policy you need - form validation', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  describe('when submitting an empty form', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerCountryForm();
      completeAndSubmitBuyerBodyForm();
      completeAndSubmitExporterLocationForm();
      completeAndSubmitUkContentForm();
      completeAndSubmitPolicyTypeMultiForm();
    });

    beforeEach(() => {
      submitButton().click();
    });

    it('should render validation errors for all required fields', () => {
      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY}`,
      );

      // max amount owed
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].IS_EMPTY}`,
      );

      // percentage of cover
      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.PERCENTAGE_OF_COVER].IS_EMPTY}`,
      );

      // credit period
      cy.checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      );

      cy.checkText(
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
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` is not a whole number', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('1234.56');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].BELOW_MINIMUM,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.MAX_AMOUNT_OWED].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` is not selected', () => {
    it('should render a validation error', () => {
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CREDIT_PERIOD].IS_EMPTY}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select(GBP_CURRENCY_CODE);
      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input().clear().type('10');

      submitButton().click();

      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains(GBP_CURRENCY_CODE);

      tellUsAboutYourPolicyPage[FIELD_IDS.MAX_AMOUNT_OWED].input()
        .should('have.attr', 'value', '10');
    });
  });
});
