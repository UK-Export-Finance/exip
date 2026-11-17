import { submitButton } from '../../../pages/shared';

/**
 * clickSubmitButton
 * Click the submit button and wait for the response document to load.
 */
const clickSubmitButton = () => {
  submitButton().then((button) => {
    const document = button[0].ownerDocument;

    cy.wrap(button).click();

    // Wait for the response, including validation rerenders at the same URL.
    cy.document({ timeout: Cypress.config('pageLoadTimeout') }).should('not.eq', document);

    cy.document().its('readyState').should('eq', 'complete');
  });
};

export default clickSubmitButton;
