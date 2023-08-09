import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../../../commands/quote/forms';
import { submitButton } from '../../../../../../pages/shared';
import { tellUsAboutYourPolicyPage } from '../../../../../../pages/quote';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  ELIGIBILITY: {
    CURRENCY,
    CONTRACT_VALUE,
    PERCENTAGE_OF_COVER,
  },
} = FIELD_IDS;

context('Tell us about the policy you need page - form validation', () => {
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
      completeAndSubmitPolicyTypeSingleForm();
    });

    beforeEach(() => {
      cy.navigateToUrl(url);

      submitButton().click();
    });

    it('should render validation errors for all required fields', () => {
      partials.errorSummaryListItems().should('exist');

      const TOTAL_REQUIRED_FIELDS = 3;
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

      // contract value
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY}`,
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
    });

    it('should focus on inputs when clicking summary error message', () => {
      // currency
      partials.errorSummaryListItemLinks().eq(0).click();
      tellUsAboutYourPolicyPage[CURRENCY].input().should('have.focus');

      // contract value
      partials.errorSummaryListItemLinks().eq(1).click();
      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input().should('have.focus');

      // perecentage of cover
      partials.errorSummaryListItemLinks().eq(2).click();
      tellUsAboutYourPolicyPage[PERCENTAGE_OF_COVER].input().should('have.focus');
    });
  });

  describe('when `contract value` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), 'a');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `contract value` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '1234.56');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `contract value` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '0');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM,
      );

      cy.checkText(
        tellUsAboutYourPolicyPage[CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      cy.navigateToUrl(url);

      tellUsAboutYourPolicyPage[CURRENCY].input().select(GBP_CURRENCY_CODE);

      cy.keyboardInput(tellUsAboutYourPolicyPage[CONTRACT_VALUE].input(), '10');

      submitButton().click();

      tellUsAboutYourPolicyPage[CURRENCY].inputOptionSelected().contains(GBP_CURRENCY_CODE);

      tellUsAboutYourPolicyPage[CONTRACT_VALUE].input()
        .should('have.attr', 'value', '10');
    });
  });
});
