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
import CONSTANTS from '../../../../../constants';
import checkText from '../../../helpers/check-text';

const { FIELD_IDS } = CONSTANTS;

context('Tell us about the policy you need page - form validation', () => {
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
      checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CURRENCY].IS_EMPTY}`,
      );

      // contract value
      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].IS_EMPTY,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].IS_EMPTY}`,
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
      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().clear().type('a');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `contract value` is not a whole number', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().clear().type('1234.56');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `contract value` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().clear().type('0');
      submitButton().click();

      checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].BELOW_MINIMUM,
      );

      checkText(
        tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].errorMessage(),
        `Error: ${ERROR_MESSAGES[FIELD_IDS.CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].input().select('GBP');
      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input().clear().type('10');

      submitButton().click();

      tellUsAboutYourPolicyPage[FIELD_IDS.CURRENCY].inputOptionSelected().contains('GBP');

      tellUsAboutYourPolicyPage[FIELD_IDS.CONTRACT_VALUE].input()
        .should('have.attr', 'value', '10');
    });
  });
});
