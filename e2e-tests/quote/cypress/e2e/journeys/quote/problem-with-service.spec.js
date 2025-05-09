import { body } from '../../../../../pages/shared';
import { PAGES } from '../../../../../content-strings';
import { ROUTES } from '../../../../../constants';

const CONTENT_STRINGS = PAGES.PROBLEM_WITH_SERVICE_PAGE;

const baseUrl = Cypress.config('baseUrl');

context('Problem with service page - Quote', () => {
  const url = ROUTES.PROBLEM_WITH_SERVICE;

  beforeEach(() => {
    cy.navigateToUrl(url);

    cy.assertUrl(`${baseUrl}${url}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.clearCookies();

    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: url,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      assertBackLink: false,
      isInsurancePage: false,
      assertCookies: false,
      assertSaveAndBackButtonDoesNotExist: true,
    });
  });

  it('renders body text', () => {
    cy.checkText(body(), CONTENT_STRINGS.BODY);
  });

  it('renders a `contact details` section', () => {
    cy.assertContactDetailsContent();
  });
});
