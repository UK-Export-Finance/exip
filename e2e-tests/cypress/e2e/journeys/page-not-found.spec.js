import { heading } from '../pages/shared';
import { pageNotFoundPage } from '../pages';
import partials from '../partials';
import { PAGES, PRODUCT } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('404 Page not found', () => {
  before(() => {
    cy.navigateToUrl('/test');
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
      cy.checkText(partials.header.serviceName(), PRODUCT.DESCRIPTION.GENERIC);

      partials.header.serviceName().should('have.attr', 'href', '/');
    });
  });

  it('renders a phase banner', () => {
    cy.checkPhaseBanner();
  });

  it('renders a heading', () => {
    cy.checkText(heading(), CONTENT_STRINGS.PAGE_TITLE);
  });

  it('renders `typed` and `pasted` text', () => {
    cy.checkText(pageNotFoundPage.typedAddress(), CONTENT_STRINGS.TYPED_ADDRESS);

    cy.checkText(pageNotFoundPage.pastedAddress(), CONTENT_STRINGS.PASTED_ADDRESS);
  });
});
