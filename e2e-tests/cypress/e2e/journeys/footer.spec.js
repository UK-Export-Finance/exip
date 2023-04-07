import footer from '../partials/footer';
import { FOOTER } from '../../../content-strings';

context('Footer', () => {
  beforeEach(() => {
    cy.login();

    cy.saveSession();
  });

  describe('support links', () => {
    it('renders a heading', () => {
      cy.checkText(footer.supportLinks.heading(), FOOTER.SUPPORT_LINKS_HEADING);
    });

    it(`renders a link to ${FOOTER.COOKIES.TEXT} and redirects to the correct URL`, () => {
      cy.checkText(footer.supportLinks.cookies(), FOOTER.COOKIES.TEXT);

      footer.supportLinks.cookies().click();
      cy.url().should('include', FOOTER.COOKIES.HREF);
    });

    it(`renders a link to ${FOOTER.REPORT_VULNERABILITY.TEXT} and redirects to the correct URL`, () => {
      cy.checkLink(footer.supportLinks.reportVulnerability(), FOOTER.REPORT_VULNERABILITY.HREF, FOOTER.REPORT_VULNERABILITY.TEXT);
    });

    it(`renders a link to ${FOOTER.CONTACT.TEXT} and redirects to the correct URL`, () => {
      cy.checkLink(footer.supportLinks.contact(), FOOTER.CONTACT.HREF, FOOTER.CONTACT.TEXT);
    });

    it(`renders a link to ${FOOTER.OGL_LICENCE.LICENCE} and redirects to the correct URL`, () => {
      footer.supportLinks.license().invoke('text').then((text) => {
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.INTRO);
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.LICENCE);
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.DISCLAIMER);
      });

      footer.supportLinks.licenseLink().should('have.attr', 'href', FOOTER.OGL_LICENCE.HREF);
    });

    it(`renders a link to ${FOOTER.CROWN_COPYRIGHT.TEXT} and redirects to the correct URL`, () => {
      const expected = `© ${FOOTER.CROWN_COPYRIGHT.TEXT}`;

      cy.checkLink(footer.supportLinks.copyright(), FOOTER.CROWN_COPYRIGHT.HREF, expected);
    });
  });
});
