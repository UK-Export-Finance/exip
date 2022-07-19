import footer from '../partials/footer';
import { FOOTER } from '../../../content-strings';

context('Footer', () => {
  beforeEach(() => {
    cy.login();
  });

  it('renders a heading', () => {
    footer.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(FOOTER.HEADING);
    });
  });

  it('renders an email address', () => {
    footer.email().invoke('text').then((text) => {
      const expected = `${FOOTER.EMAIL.HEADING}: ${FOOTER.EMAIL.VALUE}`;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders a phone number', () => {
    footer.phone().invoke('text').then((text) => {
      const expected = `${FOOTER.PHONE.HEADING}: ${FOOTER.PHONE.VALUE}`;
      expect(text.trim()).equal(expected);
    });
  });

  it('renders opening times', () => {
    footer.openingTimes().invoke('text').then((text) => {
      const expected = `${FOOTER.OPENING_TIMES.HEADING}: ${FOOTER.OPENING_TIMES.VALUE}`;
      expect(text.trim()).equal(expected);
    });
  });

  describe('support links', () => {
    it('renders a heading', () => {
      footer.supportLinks.heading().invoke('text').then((text) => {
        expect(text.trim()).equal(FOOTER.SUPPORT_LINKS_HEADING);
      });
    });

    it(`renders a link to ${FOOTER.TERMS_AND_CONDITIONS.TEXT} and redirects to the correct URL`, () => {
      footer.supportLinks.termsAndConditions().invoke('text').then((text) => {
        expect(text.trim()).equal(FOOTER.TERMS_AND_CONDITIONS.TEXT);
      });

      footer.supportLinks.termsAndConditions().click();
      cy.url().should('include', FOOTER.TERMS_AND_CONDITIONS.HREF);
    });

    it(`renders a link to ${FOOTER.REPORT_VULNERABILITY.TEXT} and redirects to the correct URL`, () => {
      footer.supportLinks.reportVulnerability().invoke('text').then((text) => {
        expect(text.trim()).equal(FOOTER.REPORT_VULNERABILITY.TEXT);
      });

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
      footer.supportLinks.copyright().invoke('text').then((text) => {
        const expected = `© ${FOOTER.CROWN_COPYRIGHT.TEXT}`;
        expect(text.trim()).equal(expected);
      });

      footer.supportLinks.copyright().should('have.attr', 'href', FOOTER.CROWN_COPYRIGHT.HREF);
    });
  });
});
