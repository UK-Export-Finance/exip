import partials from '../../../../partials';
import { PAGES } from '../../../../content-strings';
import { ROUTES } from '../../../../constants';

const CONTENT_STRINGS = PAGES.ACCESSIBILITY_STATEMENT_PAGE;

const { ROOT, ALL_SECTIONS, ACCESSIBILITY_STATEMENT } = ROUTES.INSURANCE;

const baseUrl = Cypress.config('baseUrl');

context('Accessibility statement page - Insurance - Signed in', () => {
  let dashboardUrl;

  beforeEach(() => {
    cy.completeSignInAndGoToApplication().then(({ referenceNumber: refNumber }) => {
      dashboardUrl = `${baseUrl}${ROOT}/${refNumber}${ALL_SECTIONS}`;
    });

    partials.footer.supportLinks.accessibilityStatement().click();

    cy.assertUrl(`${baseUrl}${ACCESSIBILITY_STATEMENT}`);

    cy.saveSession();
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: ROUTES.INSURANCE.ACCESSIBILITY_STATEMENT,
      backLink: dashboardUrl,
      assertSubmitButton: false,
      assertAuthenticatedHeader: true,
      isInsurancePage: true,
    });
  });
});
