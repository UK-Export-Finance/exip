import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../support/quote/forms';
import { submitButton } from '../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../pages/quote';
import partials from '../../../partials';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { FIELD_IDS } from '../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../fixtures/currencies';

context('Tell us about the policy you need page - form validation', () => {
  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  describe('when submitting an empty form', () => {
    before(() => {
      cy.login();

      completeAndSubmitBuyerCountryForm();
      completeAndSubmitBuyerBodyForm();
      completeAndSubmitExporterLocationForm();
      completeAndSubmitUkContentForm();
      completeAndSubmitPolicyTypeSingleForm();
    });

    beforeEach(() => {
      submitButton().click();
    });

    it('should render validation errors for all required fields', () => {
      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 3;
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

      // contract value
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].IS_EMPTY}`,
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
    });

    it('should focus on inputs when clicking summary error message', () => {
      // currency
      partials.errorSummaryListItemLinks().eq(0).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().should('have.focus');

      // contract value
      partials.errorSummaryListItemLinks().eq(1).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().should('have.focus');

      // perecentage of cover
      partials.errorSummaryListItemLinks().eq(2).click();
      tellUsAboutYourPolicyPage[FIELD_IDS.PERCENTAGE_OF_COVER].input().should('have.focus');
    });
  });

  describe('when `contract value` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.inputType(tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input(), 'a');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `contract value` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.inputType(tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input(), '1234.56');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `contract value` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.inputType(tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input(), '0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].BELOW_MINIMUM,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select(GBP_CURRENCY_CODE);
      cy.inputType(tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input(), '10');

      submitButton().click();

      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains(GBP_CURRENCY_CODE);

      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input()
        .should('have.attr', 'value', '10');
    });
  });
});
