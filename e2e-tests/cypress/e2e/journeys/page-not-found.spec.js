import partials from '../partials';
import { PAGES, PRODUCT } from '../../../content-strings';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('404 Page not found', () => {
  const invalidUrl = '/test';

  beforeEach(() => {
    cy.saveSession();

    cy.navigateToUrl(invalidUrl);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: '/test',
      assertSubmitButton: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertServiceHeading: false,
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

  it('renders `typed` and `pasted` text and contact text and link for quote contact us', () => {
    cy.checkPageNotFoundPageText({ isInsurancePage: false });
  });
});
