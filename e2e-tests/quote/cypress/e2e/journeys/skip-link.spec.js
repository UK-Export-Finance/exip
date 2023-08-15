import partials from '../../../../partials';
import { LINKS } from '../../../../content-strings';

// NOTE:
// In this version of cypress, there is currently no way to trigger a keyboard 'tab' event.
// https://github.com/cypress-io/cypress/issues/299
// Therefore, we can only test that the skip link exists.

context('Skip link should take user to the main content of a page', () => {
  it('When a user keyboard tabs from the html body, skip link should be focused and take the user to the page\'s #main-content', () => {
    cy.login();

    partials.skipLink().should('exist');

    cy.checkText(partials.skipLink(), LINKS.SKIP_TO_MAIN_CONTENT);
  });
});
