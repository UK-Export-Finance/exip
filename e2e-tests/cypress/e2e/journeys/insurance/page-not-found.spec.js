import { heading } from '../../pages/shared';
import { pageNotFoundPage } from '../../pages';
import { ORGANISATION, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('Insurance - page not found', () => {
  before(() => {
    cy.visit(`${ROUTES.INSURANCE.ROOT}/invalid-ref-number${ROUTES.INSURANCE.ALL_SECTIONS}`, {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
    });
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 70,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a page title and heading', () => {
    const expectedPageTitle = `${CONTENT_STRINGS.PAGE_TITLE} - ${ORGANISATION}`;
    cy.title().should('eq', expectedPageTitle);

    heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.PAGE_TITLE);
    });
  });

  it('renders body text', () => {
    pageNotFoundPage.body1().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_1);
    });

    pageNotFoundPage.body2().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.BODY_2);
    });
  });

  it('renders contact text and link', () => {
    pageNotFoundPage.contact1().invoke('text').then((text) => {
      expect(text.trim()).eq(CONTENT_STRINGS.CONTACT.TEXT);
    });

    pageNotFoundPage.contact2().invoke('text').then((text) => {
      expect(text.trim()).eq(CONTENT_STRINGS.CONTACT.LINK.TEXT);
    });

    pageNotFoundPage.contact3().invoke('text').then((text) => {
      expect(text.trim()).eq(CONTENT_STRINGS.CONTACT.OUTRO);
    });

    pageNotFoundPage.contactLink().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.CONTACT.LINK.TEXT);
    });

    pageNotFoundPage.contactLink().should('have.attr', 'href', CONTENT_STRINGS.CONTACT.LINK.HREF);
  });
});
