import { policyTypePage } from '../../../../../../pages/quote';
import { errorSummaryListItems, errorSummaryListItemLinks } from '../../../../../../partials';
import { ERROR_MESSAGES } from '../../../../../../content-strings';
import { ROUTES, FIELD_IDS } from '../../../../../../constants';

const { POLICY_TYPE } = FIELD_IDS;

const {
  QUOTE: { POLICY_TYPE: POLICY_TYPE_ROUTE },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Policy type page - policy type & length validation - single policy type', () => {
  const url = `${baseUrl}${POLICY_TYPE_ROUTE}`;

  before(() => {
    cy.navigateToRootUrl();
    cy.completeAndSubmitBuyerCountryForm({});
    cy.completeAndSubmitBuyerBodyForm();
    cy.completeAndSubmitExporterLocationForm();
    cy.completeAndSubmitUkContentForm();

    cy.assertUrl(url);
  });

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(url);
  });

  describe('when submitting an empty form', () => {
    it('should render a validation error when submitting an empty form', () => {
      cy.navigateToUrl(url);
      cy.clickSubmitButton();

      cy.checkErrorSummaryListHeading();
      cy.assertErrorSummaryListLength(1);

      const expectedErrorMessage = ERROR_MESSAGES.ELIGIBILITY[POLICY_TYPE];

      cy.checkText(errorSummaryListItems().first(), expectedErrorMessage);

      errorSummaryListItemLinks().first().click();

      const singlePolicyTypeField = policyTypePage[POLICY_TYPE].single;
      singlePolicyTypeField.input().should('have.focus');

      const policyTypeField = policyTypePage[POLICY_TYPE];

      cy.checkText(policyTypeField.errorMessage().first(), `Error: ${expectedErrorMessage}`);
    });
  });
});
