import { FIELD_IDS, ROUTES } from '../../../../../constants';
import { cookiesPage, cookiesSavedPage } from '../../../../../pages';
import partials from '../../../../../partials';
import { body } from '../../../../../pages/shared';
import { PAGES, BUTTONS } from '../../../../../content-strings';

const CONTENT_STRINGS = PAGES.COOKIES_SAVED_PAGE;

const {
  COOKIES,
  COOKIES_SAVED,
  QUOTE: { BUYER_COUNTRY },
} = ROUTES;

const { OPTIONAL_COOKIES: FIELD_ID } = FIELD_IDS;

context('Cookies saved page - Quote', () => {
  const baseUrl = Cypress.config('baseUrl');
  const url = `${baseUrl}${COOKIES_SAVED}`;
  const buyerCountryUrl = `${baseUrl}${BUYER_COUNTRY}`;

  beforeEach(() => {
    cy.login();

    partials.footer.supportLinks.cookies().click();

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
      isInsurancePage: false,
      assertCookies: false,
    });
  });

  it('renders body copy', () => {
    cy.checkText(body(), CONTENT_STRINGS.BODY);
  });

  it('renders a `return to service` button link', () => {
    const expectedUrl = buyerCountryUrl;

    cy.checkLink(
      cookiesSavedPage.returnToServiceLinkButton(),
      expectedUrl,
      BUTTONS.RETURN_TO_SERVICE,
    );
  });
});
