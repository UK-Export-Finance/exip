import footer from '../partials/footer';
import { FOOTER } from '../../../content-strings';

context('Footer', () => {
  beforeEach(() => {
    cy.login();

    cy.saveSession();
  });

  it('renders a heading', () => {
    cy.checkText(footer.heading(), FOOTER.HEADING);
  });

  it('renders an email address', () => {
    const expected = `${FOOTER.EMAIL.HEADING}: ${FOOTER.EMAIL.VALUE}`;

    cy.checkText(footer.email(), expected);
  });

  it('renders a phone number', () => {
    const expected = `${FOOTER.PHONE.HEADING}: ${FOOTER.PHONE.VALUE}`;

    cy.checkText(footer.phone(), expected);
  });

  it('renders opening times', () => {
    const expected = `${FOOTER.OPENING_TIMES.HEADING}: ${FOOTER.OPENING_TIMES.VALUE}`;

    cy.checkText(footer.openingTimes(), expected);
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
      cy.checkText(footer.supportLinks.reportVulnerability(), FOOTER.REPORT_VULNERABILITY.TEXT);

      footer.supportLinks.reportVulnerability().should('have.attr', 'href', FOOTER.REPORT_VULNERABILITY.HREF);
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

      cy.checkText(footer.supportLinks.copyright(), expected);

      footer.supportLinks.copyright().should('have.attr', 'href', FOOTER.CROWN_COPYRIGHT.HREF);
    });
  });
});
