import { pageNotFoundPage } from '../../pages';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.PAGE_NOT_FOUND_PAGE;

context('Insurance - page not found', () => {
  const invalidUrl = `${ROUTES.INSURANCE.ROOT}/invalid-ref-number${ROUTES.INSURANCE.ALL_SECTIONS}`;

  before(() => {
    cy.navigateToUrl(invalidUrl);
  });

  beforeEach(() => {
    Cypress.Cookies.preserveOnce('_csrf');
    Cypress.Cookies.preserveOnce('connect.sid');
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: invalidUrl,
      assertBackLink: false,
    });
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
