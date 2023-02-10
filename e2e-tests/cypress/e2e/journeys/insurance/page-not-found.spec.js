import { heading } from '../../pages/shared';
import { pageNotFoundPage } from '../../pages';
import { ORGANISATION, PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('Insurance - page not found', () => {
  before(() => {
    cy.navigateToUrl(`${ROUTES.INSURANCE.ROOT}/invalid-ref-number${ROUTES.INSURANCE.ALL_SECTIONS}`);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
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

    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `typed` and `pasted` text', () => {
    cy.checkText(pageNotFoundPage.typedAddress(), CONTENT_STRINGS.TYPED_ADDRESS);

    cy.checkText(pageNotFoundPage.pastedAddress(), CONTENT_STRINGS.PASTED_ADDRESS);
  });

  it('renders contact text and link', () => {
    cy.checkText(pageNotFoundPage.contact1(), CONTENT_STRINGS.CONTACT.TEXT);

    cy.checkText(pageNotFoundPage.contact2(), CONTENT_STRINGS.CONTACT.LINK.TEXT);

    cy.checkText(pageNotFoundPage.contact3(), CONTENT_STRINGS.CONTACT.OUTRO);

    cy.checkText(pageNotFoundPage.contactLink(), CONTENT_STRINGS.CONTACT.LINK.TEXT);

    pageNotFoundPage.contactLink().should('have.attr', 'href', CONTENT_STRINGS.CONTACT.LINK.HREF);
  });
});
