import { submitButton } from '../../../pages/shared';

/**
 * clickSubmitButton
 * Click the submit button and wait for the response document to load.
 */
const clickSubmitButton = () => {
  cy.document().then((document) => {
    submitButton().click();
    // Wait for the response, including validation rerenders at the same URL.
    cy.document({ timeout: Cypress.config('pageLoadTimeout') }).should('not.eq', document);
    cy.document().its('readyState').should('eq', 'complete');
  });
};

export default clickSubmitButton;
