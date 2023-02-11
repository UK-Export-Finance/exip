import { pageNotFoundPage } from '../pages';
import partials from '../partials';
import { PAGES, PRODUCT } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('404 Page not found', () => {
  before(() => {
    cy.navigateToUrl('/test');
  });

  it('renders core page elements', () => {
    cy.assertCorePageElements({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: '/test',
    });
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

  it('renders `typed` and `pasted` text', () => {
    cy.checkText(pageNotFoundPage.typedAddress(), CONTENT_STRINGS.TYPED_ADDRESS);

    cy.checkText(pageNotFoundPage.pastedAddress(), CONTENT_STRINGS.PASTED_ADDRESS);
  });
});
