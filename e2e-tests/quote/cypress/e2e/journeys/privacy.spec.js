import { footer } from '../../../../partials';
import { LINKS } from '../../../../content-strings';

context('Privacy link - as an exporter, I want to read the privacy policy', () => {
  before(() => {
    cy.navigateToRootUrl();

    footer.supportLinks.privacy().click();
  });

  it('redirects to an external UKEF privacy policy page ', () => {
    cy.url().should('include', LINKS.EXTERNAL.PRIVACY);
  });
});
