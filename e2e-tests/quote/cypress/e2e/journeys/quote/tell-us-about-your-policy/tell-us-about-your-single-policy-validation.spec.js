import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import {
  completeAndSubmitBuyerBodyForm,
  completeAndSubmitExporterLocationForm,
  completeAndSubmitUkContentForm,
  completeAndSubmitPolicyTypeSingleForm,
} from '../../../../../../commands/quote/forms';
import { field, submitButton } from '../../../../../../pages/shared';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../../../../constants';
import { GBP_CURRENCY_CODE } from '../../../../../../fixtures/currencies';

const {
  POLICY_LENGTH,
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
      cy.checkErrorSummaryListHeading();

      const TOTAL_REQUIRED_FIELDS = 4;
      partials.errorSummaryListItems().should('have.length', TOTAL_REQUIRED_FIELDS);

      // policy length
      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY,
      );

      cy.checkText(
        field(POLICY_LENGTH).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY}`,
      );

      // currency
      cy.checkText(
        partials.errorSummaryListItems().eq(1),
        ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY,
      );

      cy.checkText(
        field(CURRENCY).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CURRENCY].IS_EMPTY}`,
      );

      // contract value
      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY,
      );

      cy.checkText(
        field(CONTRACT_VALUE).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].IS_EMPTY}`,
      );

      // percentage of cover
      cy.checkText(
        partials.errorSummaryListItems().eq(3),
        ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY,
      );

      cy.checkText(
        field(PERCENTAGE_OF_COVER).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[PERCENTAGE_OF_COVER].IS_EMPTY}`,
      );
    });

    it('should focus on inputs when clicking summary error message', () => {
      // policy length
      partials.errorSummaryListItemLinks().eq(0).click();
      field(POLICY_LENGTH).input().should('have.focus');

      // currency
      partials.errorSummaryListItemLinks().eq(1).click();
      field(CURRENCY).input().should('have.focus');

      // contract value
      partials.errorSummaryListItemLinks().eq(2).click();
      field(CONTRACT_VALUE).input().should('have.focus');

      // perecentage of cover
      partials.errorSummaryListItemLinks().eq(3).click();
      field(PERCENTAGE_OF_COVER).input().should('have.focus');
    });
  });

  describe('when `policy length` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(POLICY_LENGTH).input(), 'a');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER,
      );

      cy.checkText(
        field(POLICY_LENGTH).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `policy length` contains a decimal', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(POLICY_LENGTH).input(), '1.2');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        field(POLICY_LENGTH).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `policy length` is less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(POLICY_LENGTH).input(), '0');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM,
      );

      cy.checkText(
        field(POLICY_LENGTH).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM}`,
      );
    });
  });

  describe('when `policy length` is greater than the maximum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(POLICY_LENGTH).input(), '23');
      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(0),
        ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM,
      );

      cy.checkText(
        field(POLICY_LENGTH).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM}`,
      );
    });
  });

  describe('when `contract value` has a non-numeric value', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(CONTRACT_VALUE).input(), 'a');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER,
      );

      cy.checkText(
        field(CONTRACT_VALUE).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_NUMBER}`,
      );
    });
  });

  describe('when `contract value` is not a whole number', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(CONTRACT_VALUE).input(), '1234.56');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER,
      );

      cy.checkText(
        field(CONTRACT_VALUE).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].NOT_A_WHOLE_NUMBER}`,
      );
    });
  });

  describe('when `contract value` has a value less than the minimum', () => {
    it('should render a validation error', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(CONTRACT_VALUE).input(), '0');

      submitButton().click();

      cy.checkText(
        partials.errorSummaryListItems().eq(2),
        ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM,
      );

      cy.checkText(
        field(CONTRACT_VALUE).errorMessage(),
        `Error: ${ERROR_MESSAGES.ELIGIBILITY[CONTRACT_VALUE].BELOW_MINIMUM}`,
      );
    });
  });

  describe('with any validation error', () => {
    it('should render submitted values', () => {
      cy.navigateToUrl(url);

      cy.keyboardInput(field(POLICY_LENGTH).input(), 1);

      field(CURRENCY).input().select(GBP_CURRENCY_CODE);

      cy.keyboardInput(field(CONTRACT_VALUE).input(), '10');

      submitButton().click();

      field(POLICY_LENGTH).input()
        .should('have.attr', 'value', '1');

      field(CURRENCY).inputOptionSelected().contains(GBP_CURRENCY_CODE);

      field(CONTRACT_VALUE).input()
        .should('have.attr', 'value', '10');
    });
  });
});
