import partials from '../../partials';
import { submitButton } from '../../pages/shared';
import { cookiesPage } from '../../pages';
import { FIELD_IDS, ROUTES } from '../../../../constants';

const baseUrl = Cypress.config('baseUrl');

context('Cookies consent - change via banner and cookies page', () => {
  const cookiesPageUrl = ROUTES.COOKIES;

  beforeEach(() => {
    cy.clearCookies();
    Cypress.session.clearAllSavedSessions();

    cy.login();

    cy.saveSession();
  });

  context('User submits cookie consent in the banner as `accept` and navigates to the cookies page', () => {
    beforeEach(() => {
      cy.navigateToUrl(cookiesPageUrl);

      partials.cookieBanner.question.acceptButton().click();
      partials.cookieBanner.hideButton().click();

      partials.footer.supportLinks.cookies().click();

      const expectedUrl = `${baseUrl}${cookiesPageUrl}`;

      cy.assertUrl(expectedUrl);

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner', () => {
      cy.checkCookiesConsentBannerDoesNotExist();
    });

    it('should render a google tag manager script and data layer script', () => {
      cy.checkAnalyticsScriptsAreRendered();
    });

    it('should have an EXIP analytics consent cookie with a value of true', () => {
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should allow user to immediately change their answer to `reject` and have scripts & cookies changed via the cookies page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
      submitButton().click();

      cy.checkAnalyticsScriptsAreNotRendered();
      cy.checkAnalyticsCookieIsFalse();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].rejectInput().click();
      submitButton().click();

      cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);

      partials.cookieBanner.heading().should('not.exist');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.exist');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.acceptButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
    });
  });

  context('User submits cookie consent in the banner as `reject` and navigates to the cookies page', () => {
    beforeEach(() => {
      cy.navigateToUrl(cookiesPageUrl);

      partials.cookieBanner.question.rejectButton().click();
      partials.cookieBanner.hideButton().click();

      partials.footer.supportLinks.cookies().click();
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
      cookiesPage[FIELD_IDS.OPTIONAL_COOKIES].acceptInput().click();
      submitButton().click();

      cy.checkAnalyticsScriptsAreRendered();
      cy.checkAnalyticsCookieIsTrue();
    });

    it('should NOT render the cookie consent banner when going to another page', () => {
      cy.navigateToUrl(ROUTES.QUOTE.BUYER_COUNTRY);

      partials.cookieBanner.heading().should('not.exist');
      partials.cookieBanner.hideButton().should('not.exist');
      partials.cookieBanner.cookiesLink().should('not.exist');

      partials.cookieBanner.question.copy1().should('not.exist');
      partials.cookieBanner.question.copy2().should('not.exist');
      partials.cookieBanner.question.acceptButton().should('not.exist');
      partials.cookieBanner.question.rejectButton().should('not.exist');
    });
  });
});
