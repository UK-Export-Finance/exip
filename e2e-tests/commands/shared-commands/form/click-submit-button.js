import { submitButton } from '../../../pages/shared';

/**
 * clickSubmitButton
 * Click the submit button and wait for the response document to load.
 */
const clickSubmitButton = () => {
  cy.document().then((document) => {
    submitButton().click();

    /**
     * Wait for the previous document to be replaced with the new response document.
     * This ensures that Cypress waits for the new page to load completely before proceeding.
     * Otherwise, Cypress might proceed before the new page has fully loaded and cause a test failure
     * caused by race conditions.
     */
    cy.document({ timeout: Cypress.config('pageLoadTimeout') }).should('not.eq', document);

    cy.document().its('readyState').should('eq', 'complete');
  });
};

export default clickSubmitButton;
