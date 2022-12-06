import { pageNotFoundPage } from '../pages';
import { PAGES } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('404 Page not found', () => {
  before(() => {
    cy.visit('/test', {
      auth: {
        username: Cypress.config('basicAuthKey'),
        password: Cypress.config('basicAuthSecret'),
      },
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

  it('renders a heading', () => {
    pageNotFoundPage.heading().invoke('text').then((text) => {
      expect(text.trim()).equal(CONTENT_STRINGS.HEADING);
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
});
