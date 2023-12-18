import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('Quote - page not found', () => {
  const invalidUrl = `${ROUTES.QUOTE.ROOT}/test`;

  before(() => {
    cy.navigateToUrl(invalidUrl);
  });

  beforeEach(() => {
    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: invalidUrl,
      hasAForm: false,
      assertBackLink: false,
      assertAuthenticatedHeader: false,
      isInsurancePage: false,
    });
  });

  describe('page tests', () => {
    beforeEach(() => {
      cy.navigateToUrl(invalidUrl);
    });

    it('renders `typed` and `pasted` text and contact text and link for insurance contact us', () => {
      cy.checkPageNotFoundPageText({ isInsurancePage: false });
    });
  });
});
