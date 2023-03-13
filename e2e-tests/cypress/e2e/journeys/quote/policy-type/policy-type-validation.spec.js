import { submitButton } from '../../../pages/shared';
import { policyTypePage } from '../../../pages/quote';
import partials from '../../../partials';
import { ERROR_MESSAGES } from '../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../support/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm, completeAndSubmitUkContentForm } from '../../../../support/quote/forms';

context('Policy type page - policy type & length validation - single policy type', () => {
  const url = ROUTES.QUOTE.POLICY_TYPE;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.url().should('include', url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
    policyTypePage[FIELD_IDS.POLICY_TYPE].single.input().click();
  });

  it('should render a validation error when `single policy length` is not provided', () => {
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY,
    );

    cy.checkText(
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].IS_EMPTY}`,
    );
  });

  it('should render a validation error when `single policy length` has a non-numeric value', () => {
    cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), 'a');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER,
    );

    cy.checkText(
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_NUMBER}`,
    );
  });

  it('should render a validation error when `single policy length` contains a decimal', () => {
    cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '1.2');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
    );

    cy.checkText(
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
    );
  });

  it('should render a validation error when `single policy length` is less than the minimum', () => {
    cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '0');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM,
    );

    cy.checkText(
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].BELOW_MINIMUM}`,
    );
  });

  it('should render a validation error when `single policy length` is greater than the maximum', () => {
    cy.keyboardInput(policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].input(), '23');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM,
    );

    cy.checkText(
      policyTypePage[FIELD_IDS.SINGLE_POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES[FIELD_IDS.SINGLE_POLICY_LENGTH].ABOVE_MAXIMUM}`,
    );
  });
});
