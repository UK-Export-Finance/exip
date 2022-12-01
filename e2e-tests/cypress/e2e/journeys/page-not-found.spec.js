import { heading } from '../pages/shared';
import { pageNotFoundPage } from '../pages';
import partials from '../partials';
import { PAGES, PRODUCT } from '../../../content-strings';

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

  describe('header', () => {
    it('renders a GOV home link', () => {
      partials.header.govHomeLink().should('exist');

      partials.header.govHomeLink().should('have.attr', 'href', 'https://www.gov.uk');
    });

    it('renders service name link', () => {
      partials.header.serviceName().invoke('text').then((text) => {
        expect(text.trim()).equal(PRODUCT.DESCRIPTION.GENERIC);
      });

      partials.header.serviceName().should('have.attr', 'href', '/');
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a heading', () => {
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
});
