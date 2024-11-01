import { cookieBanner } from '../../../../../partials';
import { cookiesPage } from '../../../../../pages';
import { FIELD_IDS, ROUTES } from '../../../../../constants';

const {
  COOKIES,
  QUOTE: { BUYER_COUNTRY },
} = ROUTES;

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - change via banner and cookies page', () => {
  const cookiesPageUrl = `${baseUrl}${COOKIES}`;

  beforeEach(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.navigateToRootUrl();

    cy.saveSession();
  });

  context('User submits cookie consent in the banner as `accept` and navigates to the cookies page', () => {
    beforeEach(() => {
      cy.navigateToUrl(cookiesPageUrl);

      cookieBanner.question.acceptButton().click();
      cookieBanner.hideButton().click();

      cy.clickFooterCookiesLink();

      cy.assertUrl(cookiesPageUrl);

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner', () => {
      cy.checkCookiesConsentBannerDoesNotExist();
    });

    it('should render a google analytics and google tag manager scripts', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should have an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should allow user to immediately change their answer to `reject` and have scripts & cookies changed via the cookies page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].reject.label().click();
      cy.clickSubmitButton();

      cy.checkAnalyticsScriptsAreNotRendered();
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].reject.label().click();
      cy.clickSubmitButton();

      cy.navigateToUrl(BUYER_COUNTRY);

      cookieBanner.heading().should('not.exist');
      cookieBanner.hideButton().should('not.exist');
      cookieBanner.cookiesLink().should('not.exist');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.acceptButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
    });
  });

  context('User submits cookie consent in the banner as `reject` and navigates to the cookies page', () => {
    beforeEach(() => {
      cy.navigateToUrl(cookiesPageUrl);

      cookieBanner.question.rejectButton().click();
      cookieBanner.hideButton().click();

      cy.clickFooterCookiesLink();

      cy.assertUrl(cookiesPageUrl);

      cy.checkAnalyticsScriptsAreNotRendered();
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should NOT render the cookie consent banner', () => {
      cy.checkCookiesConsentBannerDoesNotExist();
    });

    it('should NOT render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreNotRendered();
    });

    it('should have an EXIP analytics consent cookie with a value of false', () => {
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should allow user to immediately change their answer to `approve` and have scripts & cookies changed via the cookies page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].accept.label().click();
      cy.clickSubmitButton();

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cy.navigateToUrl(BUYER_COUNTRY);

      cookieBanner.heading().should('not.exist');
      cookieBanner.hideButton().should('not.exist');
      cookieBanner.cookiesLink().should('not.exist');

      cookieBanner.question.copy().should('not.exist');
      cookieBanner.question.acceptButton().should('not.exist');
      cookieBanner.question.rejectButton().should('not.exist');
    });
  });
});
