import { cookiesPage } from '../pages';
import partials from '../partials';
import { LINKS } from '../../../content-strings';

context('Privacy link', () => {
  before(() => {
    cy.login();

    partials.footer.supportLinks.privacy().click();
  });

  it('redirects to an external UKEF privacy policy page ', () => {
    // microsoft forms generates a new URL from the short URL we provide.
    cy.url().should('include', LINKS.EXTERNAL.PRIVACY);
  });
});
