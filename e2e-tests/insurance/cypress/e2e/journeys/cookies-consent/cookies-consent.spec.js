import partials from '../../../../../partials';
import { COOKIES_CONSENT } from '../../../../../content-strings';
import { INSURANCE_ROUTES } from '../../../../../constants/routes/insurance';

const { COOKIES, ROOT } = INSURANCE_ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Insurance - Cookies consent - initial/default', () => {
  const rootUrl = `${baseUrl}${ROOT}`;

  beforeEach(() => {
    cy.clearCookies();
    cy.navigateToUrl(rootUrl);
  });

  it('should render a link to cookies', () => {
    cy.checkLink(
      partials.cookieBanner.cookiesLink(),
      COOKIES,
      COOKIES_CONSENT.QUESTION.VIEW_COOKIES,
    );
  });

  it(`should redirect to ${COOKIES} when clicking cookies link`, () => {
    partials.cookieBanner.cookiesLink().click();

    const expectedUrl = `${baseUrl}${COOKIES}`;

    cy.assertUrl(expectedUrl);
  });

  describe('when clicking `accept cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.navigateToUrl(rootUrl);

      partials.cookieBanner.question.acceptButton().click();
    });

    it(`should render 'accepted' banner with link to ${COOKIES}`, () => {
      cy.checkLink(
        partials.cookieBanner.cookiesLink(),
        COOKIES,
        COOKIES_CONSENT.COOKIES_LINK,
      );
    });

    it(`should redirect to ${COOKIES} when clicking cookies link`, () => {
      partials.cookieBanner.cookiesLink().click();

      const expectedUrl = `${baseUrl}${COOKIES}`;

      cy.assertUrl(expectedUrl);
    });
  });

  describe('when clicking `reject cookies` button', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.navigateToUrl(rootUrl);

      partials.cookieBanner.question.rejectButton().click();
    });

    it(`should render 'rejected' banner with link to ${COOKIES}`, () => {
      cy.checkLink(
        partials.cookieBanner.cookiesLink(),
        COOKIES,
        COOKIES_CONSENT.COOKIES_LINK,
      );
    });

    it(`should redirect to ${COOKIES} when clicking cookies link`, () => {
      partials.cookieBanner.cookiesLink().click();

      const expectedUrl = `${baseUrl}${COOKIES}`;

      cy.assertUrl(expectedUrl);
    });
  });
});
