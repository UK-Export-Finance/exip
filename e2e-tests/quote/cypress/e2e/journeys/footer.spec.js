import footer from '../../../../partials/footer';
import { FOOTER } from '../../../../content-strings';

context('Footer', () => {
  beforeEach(() => {
    cy.login();

    cy.saveSession();
  });

  describe('support links', () => {
    it('renders a heading', () => {
      cy.checkText(footer.supportLinks.heading(), FOOTER.SUPPORT_LINKS_HEADING);
    });

    it(`renders a ${FOOTER.ACCESSIBILITY_STATEMENT.TEXT} link with the correct URL`, () => {
      cy.checkLink(footer.supportLinks.accessibilityStatement(), FOOTER.ACCESSIBILITY_STATEMENT.QUOTE_HREF, FOOTER.ACCESSIBILITY_STATEMENT.TEXT);
    });

    it(`renders a ${FOOTER.PRIVACY.TEXT} link with the correct URL`, () => {
      cy.checkLink(footer.supportLinks.privacy(), FOOTER.PRIVACY.HREF, FOOTER.PRIVACY.TEXT);
    });

    it(`renders a ${FOOTER.COOKIES.TEXT} link with the correct URL`, () => {
      cy.checkLink(footer.supportLinks.cookies(), FOOTER.COOKIES.QUOTE_HREF, FOOTER.COOKIES.TEXT);
    });

    it(`renders a link to ${FOOTER.REPORT_VULNERABILITY.TEXT} with the correct URL`, () => {
      cy.checkLink(footer.supportLinks.reportVulnerability(), FOOTER.REPORT_VULNERABILITY.HREF, FOOTER.REPORT_VULNERABILITY.TEXT);
    });

    it(`renders a link to ${FOOTER.CONTACT.TEXT} and redirects to the correct URL`, () => {
      cy.checkLink(footer.supportLinks.contact(), FOOTER.CONTACT.QUOTE_HREF, FOOTER.CONTACT.TEXT);
    });

    it(`renders a ${FOOTER.OGL_LICENCE.LICENCE} link with the correct URL`, () => {
      footer.supportLinks.license().invoke('text').then((text) => {
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.INTRO);
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.LICENCE);
        expect(text.trim()).includes(FOOTER.OGL_LICENCE.DISCLAIMER);
      });

      cy.checkLink(footer.supportLinks.licenseLink(), FOOTER.OGL_LICENCE.HREF, FOOTER.OGL_LICENCE.LICENCE);
    });

    it(`renders a link to ${FOOTER.CROWN_COPYRIGHT.TEXT} with the correct URL`, () => {
      const expectedText = `© ${FOOTER.CROWN_COPYRIGHT.TEXT}`;

      cy.checkLink(footer.supportLinks.copyright(), FOOTER.CROWN_COPYRIGHT.HREF, expectedText);
    });
  });
});
