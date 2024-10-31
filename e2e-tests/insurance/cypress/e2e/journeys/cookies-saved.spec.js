import { FIELD_IDS, ROUTES } from '../../../../constants';
import { cookiesPage, cookiesSavedPage } from '../../../../pages';
import { body } from '../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../content-strings';

const CONTENT_STRINGS = PAGES.COOKIES_SAVED_PAGE;

const {
  INSURANCE: {
    COOKIES,
    COOKIES_SAVED,
    ELIGIBILITY: { CHECK_IF_ELIGIBLE },
  },
} = ROUTES;

const { OPTIONAL_COOKIES: FIELD_ID } = FIELD_IDS;

context('Cookies saved page - Insurance', () => {
  const baseUrl = Cypress.config('baseUrl');
  const url = `${baseUrl}${COOKIES_SAVED}`;

  beforeEach(() => {
    cy.navigateToRootUrl();

    cy.navigateToCheckIfEligibleUrl();

    cy.clickFooterCookiesLink();

    cy.saveSession();

    cookiesPage[FIELD_ID].accept.label().click();

    cy.clickSubmitButton();

    cy.assertUrl(url);
  });

  it('renders core page elements', () => {
    cy.corePageChecks({
      pageTitle: CONTENT_STRINGS.PAGE_TITLE,
      currentHref: COOKIES_SAVED,
      backLink: COOKIES,
      hasAForm: false,
      assertAuthenticatedHeader: false,
      assertSaveAndBackButtonDoesNotExist: true,
      isInsurancePage: true,
      assertCookies: false,
    });
  });

  it('renders body copy', () => {
    cy.checkText(body(), CONTENT_STRINGS.BODY);
  });

  it('renders a `return to service` button link', () => {
    const expectedUrl = `${baseUrl}${CHECK_IF_ELIGIBLE}`;

    cy.checkLink(cookiesSavedPage.returnToServiceLinkButton(), expectedUrl, BUTTONS.RETURN_TO_SERVICE);
  });
});
