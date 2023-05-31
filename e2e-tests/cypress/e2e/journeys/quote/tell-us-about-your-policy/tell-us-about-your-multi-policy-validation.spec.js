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
import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CURRENCY,
    MAX_AMOUNT_OWED,
    PERCENTAGE_OF_COVER,
    CREDIT_PERIOD,
  },
} = FIELD_IDS;

context('Tell us about the multiple policy you need - form validation', () => {
  const url = ROUTES.QUOTE.TELL_US_ABOUT_YOUR_POLICY;

  beforeEach(() => {
    cy.saveSession();
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
      cy.navigateToUrl(url);

      submitButton().click();
    });

    it('should render validation errors for all required fields', () => {
      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // currency
      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY}`,
      );

      // max amount owed
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].IS_EMPTY}`,
      );

      // percentage of cover
      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY}`,
      );

      // credit period
      cy.checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY}`,
      );
    });

    it('should focus on inputs when clicking summary error message', () => {
      // currency
      partials.errorSummaryListItemLinks().eq(0).click();
      tellUsAboutYourPolicyPage[CURRENCY].input().should('have.focus');

      // max amount owed
      partials.errorSummaryListItemLinks().eq(1).click();
      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input().should('have.focus');

      // perecentage of cover
      partials.errorSummaryListItemLinks().eq(2).click();
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().should('have.focus');

      // credit period
      partials.errorSummaryListItemLinks().eq(3).click();
      tellUsAboutYourPolicyPage[CREDIT_PERIOD].input().should('have.focus');
    });
  });

  describe('when `max amount owed` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), 'a');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '1234.56');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `max amount owed` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].BELOW_MINIMUM,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[MAX_AMOUNT_OWED].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `credit period` is not selected', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CREDIT_PERIOD].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CREDIT_PERIOD].IS_EMPTY}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      cy.navigateToUrl(url);

      tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);
      cy.keyboardInput(tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input(), '10');

      submitButton().click();

      tellUsAboutYourPolicyPage[CURRENCY].inputOptionSelected().contains(GBP_CURRENCY_CODE);

      tellUsAboutYourPolicyPage[MAX_AMOUNT_OWED].input()
        .should('have.attr', 'value', '10');
    });
  });
});
