import { cookiesPage } from '../pages';
import partials from '../partials';
import { BUTTONS, LINKS, PAGES } from '../../../content-strings';
import { FIELD_IDS, ROUTES } from '../../../constants';

const CONTENT_STRINGS = PAGES.COOKIES_PAGE;

context('Accessibility statement page', () => {
  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.accessibilityStatement().click();
    cy.url().should('include', ROUTES.ACCESSIBILITY_STATEMENT);

    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('exip-session');
  });

  it('passes the audits', () => {
    cy.lighthouse({
      accessibility: 100,
      performance: 75,
      'best-practices': 100,
      seo: 60,
    });
  });

  it('renders an analytics cookies consent banner that can be accepted', () => {
    cy.checkAnalyticsCookiesConsentAndAccept();
  });

  it('renders an analytics cookies consent banner that can be rejected', () => {
    cy.rejectAnalyticsCookies();
  });

  it('renders a back link with correct url', () => {
    partials.backLink().should('exist');
    partials.backLink().invoke('text').then((text) => {
      expect(text.trim()).equal(LINKS.BACK);
    });

    const expected = `${Cypress.config('baseUrl')}${ROUTES.QUOTE.BUYER_COUNTRY}`;

    partials.backLink().should('have.attr', 'href', expected);
  });

  it('renders a heading', () => {
    cookiesPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
    });
  });
});
