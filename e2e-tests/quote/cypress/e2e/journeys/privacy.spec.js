import partials from '../../../../partials';
import { LINKS } from '../../../../content-strings';

context('Privacy link - as en exporter, I want to read the privacy policy', () => {
  before(() => {
    cy.login();

    partials.footer.supportLinks.privacy().click();
  });

  it('redirects to an external UKEF privacy policy page ', () => {
    cy.url().should('include', LINKS.EXTERNAL.PRIVACY);
  });
});
