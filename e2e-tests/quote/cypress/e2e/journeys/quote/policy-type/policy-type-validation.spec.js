import { submitButton } from '../../../../../../pages/shared';
import { policyTypePage } from '../../../../../../pages/quote';
import partials from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';
import { completeAndSubmitBuyerCountryForm } from '../../../../../../commands/forms';
import { completeAndSubmitBuyerBodyForm, completeAndSubmitExporterLocationForm, completeAndSubmitUkContentForm } from '../../../../../../commands/quote/forms';

const { POLICY_TYPE } = FIELD_IDS;

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
    completeAndSubmitBuyerCountryForm({});
    completeAndSubmitBuyerBodyForm();
    completeAndSubmitExporterLocationForm();
    completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  describe('when submitting an empty form', () => {
    it('should render a validation error when submitting an empty form', () => {
      cy.navigateToUrl(url);
      submitButton().click();

      cy.checkErrorSummaryListHeading();
      partials.errorSummaryListItems().should('have.length', 1);

      const expectedErrorMessage = ERROR_MESSAGES.ELIGIBILITY[POLICY_TYPE];

      cy.checkText(
        partials.errorSummaryListItems().first(),
        expectedErrorMessage,
      );

      partials.errorSummaryListItemLinks().first().click();

      const singlePolicyTypeField = policyTypePage[POLICY_TYPE].single;
      singlePolicyTypeField.input().should('have.focus');

      const policyTypeField = policyTypePage[POLICY_TYPE];

      cy.checkText(policyTypeField.errorMessage().first(), `Error: ${expectedErrorMessage}`);
    });
  });
});
