import header from '../../../../partials/header';
import { PAGES, PRODUCT } from '../../../../content-strings';

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
      hasAForm: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
      assertServiceHeading: false,
    });
  });

  describe('header', () => {
    it('renders a GOV home link', () => {
      cy.checkLink(
        header.govHomeLink(),
        'https://www.gov.uk',
        'GOV.UK',
      );
    });

    it('renders service name link', () => {
      const expectedHref = '/';
      const expectedText = PRODUCT.DESCRIPTION.GENERIC;

      cy.checkLink(
        header.serviceName(),
        expectedHref,
        expectedText,
      );
    });
  });

  it('renders `typed` and `pasted` text and contact text and link for quote contact us', () => {
    cy.checkPageNotFoundPageText({ isInsurancePage: false });
  });
});
