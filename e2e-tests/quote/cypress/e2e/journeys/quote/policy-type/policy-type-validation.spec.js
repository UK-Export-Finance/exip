import { submitButton } from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm, completeAndSubmitUkContentForm } from '../../../../../../commands/quote/forms';

const { POLICY_TYPE, POLICY_LENGTH } = FIELD_IDS;

const {
  QUOTE: {
    POLICY_TYPE: POLICY_TYPE_ROUTE,
  },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Policy type page - policy type & length validation - single policy type', () => {
  const url = `${baseUrl}${POLICY_TYPE_ROUTE}`;

  before(() => {
    cy.login();
    completeAndSubmitBuyerCountryForm();
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
    policyTypePage[POLICY_TYPE].single.input().click();
  });

  describe('when submitting an empty form', () => {
    it('should render a validation error when submitting an empty form', () => {
      cy.navigateToUrl(url);
      submitButton().click();

      partials.errorSummaryListItems().should('have.length', 1);

      const expectedMessage = ERROR_MESSAGES.ELIGIBILITY[POLICY_TYPE];

      cy.checkText(partials.errorSummaryListItems().first(), expectedMessage);
    });
  });

  it('should render a validation error when `single policy length` is not provided', () => {
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY,
    );

    cy.checkText(
      policyTypePage[POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].IS_EMPTY}`,
    );
  });

  it('should render a validation error when `single policy length` has a non-numeric value', () => {
    cy.keyboardInput(policyTypePage[POLICY_LENGTH].input(), 'a');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER,
    );

    cy.checkText(
      policyTypePage[POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_NUMBER}`,
    );
  });

  it('should render a validation error when `single policy length` contains a decimal', () => {
    cy.keyboardInput(policyTypePage[POLICY_LENGTH].input(), '1.2');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER,
    );

    cy.checkText(
      policyTypePage[POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].NOT_A_WHOLE_NUMBER}`,
    );
  });

  it('should render a validation error when `single policy length` is less than the minimum', () => {
    cy.keyboardInput(policyTypePage[POLICY_LENGTH].input(), '0');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM,
    );

    cy.checkText(
      policyTypePage[POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].BELOW_MINIMUM}`,
    );
  });

  it('should render a validation error when `single policy length` is greater than the maximum', () => {
    cy.keyboardInput(policyTypePage[POLICY_LENGTH].input(), '23');
    submitButton().click();

    cy.checkText(
      partials.errorSummaryListItems().eq(0),
      ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM,
    );

    cy.checkText(
      policyTypePage[POLICY_LENGTH].errorMessage(),
      `Error: ${ERROR_MESSAGES.ELIGIBILITY[POLICY_LENGTH].ABOVE_MAXIMUM}`,
    );
  });
});
